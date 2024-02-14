import type { Metadata } from "next";
export const siteConfig: Metadata = {
  metadataBase: new URL("https://razinpay.com"),
  title: {
    default: "Razin Pay",
    template: "%s | Razin Pay",
  },

  manifest: "/site.webmanifest",

  applicationName: "Razin Pay",

  creator: "",

  authors: [
    {
      name: "",
      url: "",
    },
  ],

  icons: [{ rel: "icon", url: "/favicon.ico" }],

  description:
    "",

  openGraph: {
    title: "",
    description:
      "",
    siteName: "Razin Pay",
    locale: "en_US",
    url: new URL("https://razinpay.com"),
    images: ["https://razinpay.com/og-image.png"],
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  twitter: {
    title: "Razin Pay",
    creator: "@foobar",
    card: "summary_large_image",
    images: ["https://razinpay.com/twitter-og-image.png"],
  },
};