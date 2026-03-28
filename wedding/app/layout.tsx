import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cormorant = localFont({
  src: [
    { path: "../public/Cormorant_Garamond/CormorantGaramond-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/Cormorant_Garamond/CormorantGaramond-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../public/Cormorant_Garamond/CormorantGaramond-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/Cormorant_Garamond/CormorantGaramond-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/Cormorant_Garamond/CormorantGaramond-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/Cormorant_Garamond/CormorantGaramond-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../public/Cormorant_Garamond/CormorantGaramond-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/Cormorant_Garamond/CormorantGaramond-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../public/Cormorant_Garamond/CormorantGaramond-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/Cormorant_Garamond/CormorantGaramond-BoldItalic.ttf", weight: "700", style: "italic" }
  ],
  display: "swap",
  variable: "--font-heading",
});

const lato = localFont({
  src: [
    { path: "../public/Lato/Lato-Thin.ttf", weight: "100", style: "normal" },
    { path: "../public/Lato/Lato-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "../public/Lato/Lato-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/Lato/Lato-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../public/Lato/Lato-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/Lato/Lato-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/Lato/Lato-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/Lato/Lato-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../public/Lato/Lato-Black.ttf", weight: "900", style: "normal" },
    { path: "../public/Lato/Lato-BlackItalic.ttf", weight: "900", style: "italic" }
  ],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Tommy & Linh Wedding | Neo-Vietnamese Formalism",
  description: "Join us in celebrating our wedding with a blend of tradition, minimalism, and elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
