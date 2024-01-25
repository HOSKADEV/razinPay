import type { Metadata } from "next";
export const siteConfig: Metadata = {
  metadataBase: new URL("https://muswaddati.vercel.app"),
  title: {
    default: "Razin Pay",
    template: "%s | Razin Pay",
  },

  manifest: "/site.webmanifest",

  applicationName: "Razin Pay",

  creator: "Mohamed Lifa",

  authors: [
    {
      name: "Mohamed Lifa",
      url: "https://mohamed-lifa7.vercel.app",
    },
  ],

  icons: [{ rel: "icon", url: "/favicon.ico" }],

  description:
    "Muswaddati allows seamless team collaboration on documents in real-time through cloud-based workspaces.",

  openGraph: {
    title: "Muswaddati",
    description:
      "Muswaddati allows seamless team collaboration on documents in real-time through cloud-based workspaces.",
    siteName: "Muswaddati",
    locale: "en_US",
    url: new URL("https://muswaddati.vercel.app"),
    images: ["https://muswaddati.vercel.app/og-image.png"],
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
    creator: "@LifaSeddik",
    card: "summary_large_image",
    images: ["https://muswaddati.vercel.app/twitter-og-image.png"],
  },
};
