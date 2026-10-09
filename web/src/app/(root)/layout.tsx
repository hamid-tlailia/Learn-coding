import { ThemeScript } from "@/components/ThemeScript";
import "../globals.css";

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
