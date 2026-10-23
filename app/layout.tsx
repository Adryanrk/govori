import type { Metadata } from "next";
import "./globals.css";

// Fonts load straight from Google Fonts (all subsets, Cyrillic included).
// The font names are set as CSS variables at the top of globals.css.
const FONTS =
  "https://fonts.googleapis.com/css2?family=Unbounded:wght@400;500;600&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";

export const metadata: Metadata = {
  title: "Govori — Learn Russian, one day at a time",
  description:
    "Short daily Russian sessions shaped around the time you have. From the alphabet to C2, at your own pace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>{children}</body>
    </html>
  );
}
