import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { ReactLenis } from "./utils/lenis";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const rubik = Rubik({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amr Khaled",
  description: "Amr Khaled's portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body className={`${rubik.className} antialiased`}>{children}</body>
      </ReactLenis>
    </html>
  );
}
