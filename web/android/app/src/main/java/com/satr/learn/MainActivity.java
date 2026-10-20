package com.satr.learn;

import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.view.ViewGroup.MarginLayoutParams;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;
import java.util.Map;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ThemePlugin.class);
        super.onCreate(savedInstanceState);
        bridge.setWebViewClient(new StaticExportClient(this));
        keepAboveKeyboard();
    }

    /**
     * Android 15 draws apps edge to edge, and Capacitor's margins there only cover the system
     * bars, so the keyboard would sit on top of the editor. Lift the page above the keyboard too.
     */
    private void keepAboveKeyboard() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.VANILLA_ICE_CREAM) return;
        WebView webView = bridge.getWebView();
        ViewCompat.setOnApplyWindowInsetsListener(webView, (v, windowInsets) -> {
            Insets bars = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars() | WindowInsetsCompat.Type.displayCutout());
            Insets ime = windowInsets.getInsets(WindowInsetsCompat.Type.ime());
            MarginLayoutParams mlp = (MarginLayoutParams) v.getLayoutParams();
            mlp.leftMargin = bars.left;
            mlp.topMargin = bars.top;
            mlp.rightMargin = bars.right;
            mlp.bottomMargin = Math.max(bars.bottom, ime.bottom);
            v.setLayoutParams(mlp);
            return WindowInsetsCompat.CONSUMED;
        });
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
