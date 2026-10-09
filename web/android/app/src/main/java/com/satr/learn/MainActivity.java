package com.satr.learn;

import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;
import java.util.Map;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ThemePlugin.class);
        super.onCreate(savedInstanceState);
        bridge.setWebViewClient(new StaticExportClient(this));
    }

    /**
     * The web app is a static export where every page is a folder with an index.html
     * (e.g. /ar/learn/ -> /ar/learn/index.html). Capacitor would otherwise answer every
     * extension-less path with the root index.html, so page loads land on the wrong page.
     */
    private static class StaticExportClient extends BridgeWebViewClient {

        private final MainActivity activity;

        StaticExportClient(MainActivity activity) {
            super(activity.bridge);
            this.activity = activity;
        }

        @Override
        public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
            Uri url = request.getUrl();
            String path = url.getPath();
            boolean local = url.getHost() != null && url.getHost().equals(activity.bridge.getHost());
            if (local && path != null && !path.equals("/")) {
                String last = url.getLastPathSegment();
                if (last != null && !last.contains(".")) {
                    String folder = path.endsWith("/") ? path : path + "/";
                    Uri rewritten = url.buildUpon().path(folder + "index.html").build();
                    return super.shouldInterceptRequest(view, new RewrittenRequest(request, rewritten));
                }
            }
            return super.shouldInterceptRequest(view, request);
        }
    }

    private static class RewrittenRequest implements WebResourceRequest {

        private final WebResourceRequest original;
        private final Uri url;

        RewrittenRequest(WebResourceRequest original, Uri url) {
            this.original = original;
            this.url = url;
        }

        @Override
        public Uri getUrl() {
            return url;
        }

        @Override
        public boolean isForMainFrame() {
            return original.isForMainFrame();
        }

        @Override
        public boolean isRedirect() {
            return original.isRedirect();
        }

        @Override
        public boolean hasGesture() {
            return original.hasGesture();
        }

        @Override
        public String getMethod() {
            return original.getMethod();
        }

        @Override
        public Map<String, String> getRequestHeaders() {
            return original.getRequestHeaders();
        }
    }
}
