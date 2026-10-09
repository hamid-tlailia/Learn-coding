package com.satr.learn;

import android.graphics.Color;
import android.view.View;
import android.view.Window;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Paints the area behind the status and navigation bars with the app's background
 * and picks dark or light bar icons, so light mode never shows a black strip.
 * On Android 15+ apps draw edge to edge and the bar colour API is ignored, so the
 * colour has to come from the views behind the bars.
 */
@CapacitorPlugin(name = "CmTheme")
public class ThemePlugin extends Plugin {

    @PluginMethod
    public void set(PluginCall call) {
        boolean dark = Boolean.TRUE.equals(call.getBoolean("dark", true));
        String hex = call.getString("color", dark ? "#0a0f24" : "#f3f6f6");
        int color;
        try {
            color = Color.parseColor(hex);
        } catch (IllegalArgumentException e) {
            call.reject("Invalid color");
            return;
        }

        getActivity()
            .runOnUiThread(() -> {
                Window window = getActivity().getWindow();
                View decor = window.getDecorView();
                decor.setBackgroundColor(color);
                View webView = getBridge().getWebView();
                if (webView.getParent() instanceof View) {
                    ((View) webView.getParent()).setBackgroundColor(color);
                }
                window.setStatusBarColor(color);
                window.setNavigationBarColor(color);
                WindowInsetsControllerCompat bars = new WindowInsetsControllerCompat(window, decor);
                bars.setAppearanceLightStatusBars(!dark);
                bars.setAppearanceLightNavigationBars(!dark);
                call.resolve(new JSObject());
            });
    }
}
