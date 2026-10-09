import { SETTINGS_KEY } from "@/lib/keys";

/** Runs before first paint so the saved theme and accent never flash. */
export function ThemeScript() {
  const code = `(function(){try{var s=JSON.parse(localStorage.getItem(${JSON.stringify(SETTINGS_KEY)})||"{}");var m=s.theme||"dark";var d=m==="dark"||(m==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.dataset.theme=d?"dark":"light";r.dataset.accent=s.accent||"neon";}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
