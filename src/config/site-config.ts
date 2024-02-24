export const siteConfig = {
  metadataBase: new URL("https://razinpay.com"),
  manifest: "/site.webmanifest",
  applicationName: "Razin Pay",
  creator: "Your Name",
  authors: [
    {
      name: "Mohamed lifa7",
      url: "https://mohamed-lifa-7.com",
    },
  ],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    siteName: "Razin Pay",
    locale: "ar_DZ",
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
    title: "Razin Pay - Secure Escrow Service",
    creator: "@yourtwitterhandle",
    card: "summary_large_image",
    images: ["https://razinpay.com/twitter-og-image.png"],
  },
  keywords: ["escrow", "secure", "transactions", "buyers", "sellers"],
  
};
