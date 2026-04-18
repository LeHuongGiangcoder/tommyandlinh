import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cormorant = localFont({
  src: [
    { path: "./fonts/Cormorant_Garamond/CormorantGaramond-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Cormorant_Garamond/CormorantGaramond-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "./fonts/Cormorant_Garamond/CormorantGaramond-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Cormorant_Garamond/CormorantGaramond-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Cormorant_Garamond/CormorantGaramond-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Cormorant_Garamond/CormorantGaramond-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "./fonts/Cormorant_Garamond/CormorantGaramond-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Cormorant_Garamond/CormorantGaramond-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "./fonts/Cormorant_Garamond/CormorantGaramond-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Cormorant_Garamond/CormorantGaramond-BoldItalic.ttf", weight: "700", style: "italic" }
  ],
  display: "swap",
  variable: "--font-heading",
});

const lato = localFont({
  src: [
    { path: "./fonts/Lato/Lato-Thin.ttf", weight: "100", style: "normal" },
    { path: "./fonts/Lato/Lato-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "./fonts/Lato/Lato-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Lato/Lato-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "./fonts/Lato/Lato-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Lato/Lato-Italic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/Lato/Lato-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Lato/Lato-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "./fonts/Lato/Lato-Black.ttf", weight: "900", style: "normal" },
    { path: "./fonts/Lato/Lato-BlackItalic.ttf", weight: "900", style: "italic" }
  ],
  display: "swap",
  variable: "--font-body",
});

import AudioPlayer from "./components/AudioPlayer";

export const metadata: Metadata = {
  metadataBase: new URL("https://mylinh.thetwo.site"),
  title: "Tommy & Linh Wedding | 17.01.2027",
  description:
    "We're getting married! Come celebrate our big day with us. We're so excited to have you there.",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Tommy & Linh Wedding",
    description:
      "We're getting married! Come celebrate our big day with us. We're so excited to have you there.",
    url: "https://mylinh.thetwo.site",
    siteName: "Tommy & Linh Wedding",
    images: [
      {
        url: "https://mylinh.thetwo.site/1.webp", 
        width: 1200,
        height: 800,
        type: "image/webp",
        alt: "Tommy & Linh Wedding Preview Image",
      },
    ],
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tommy & Linh Wedding",
    description:
      "We're getting married! Come celebrate our big day with us. We're so excited to have you there.",
    images: ["https://mylinh.thetwo.site/1.webp"],
  },
};






export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      prefix="og: http://ogp.me/ns#"
      className={`${cormorant.variable} ${lato.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-body bg-surface">
        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
