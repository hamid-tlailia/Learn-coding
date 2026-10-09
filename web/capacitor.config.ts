import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.satr.learn",
  appName: "Code Master",
  webDir: "out",
  backgroundColor: "#0a0f24",
  android: {
    // The lesson preview loads images and pages over https only.
    allowMixedContent: false,
    // Keep the header clear of the status bar on Android 15+, which draws apps edge to edge.
    adjustMarginsForEdgeToEdge: "auto",
  },
};

export default config;
