import { LocaleRedirect } from "@/components/LocaleRedirect";

/** A static site has no server to redirect `/`, so the browser picks the language. */
export default function RootPage() {
  return <LocaleRedirect />;
}
