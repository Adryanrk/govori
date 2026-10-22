import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Unbounded } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-unbounded",
});
const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});
const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Govori — Learn Russian, one day at a time",
  description:
    "Short daily Russian sessions shaped around the time you have. From the alphabet to C2, at your own pace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${unbounded.variable} ${manrope.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
