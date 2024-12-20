import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "@/src/store";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  variable: "--font-ibm-plex-serif",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "RadiantBank",
  description: "Banking that Shines Bright",
  icons: "/icons/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body
          className={`${inter.variable} ${ibmPlexSerif.variable} antialiased`}
        >
          {children}
        </body>
      </Provider>
    </html>
  );
}
