import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { dir } from "i18next";
import i18nConfig from "@/i18nConfig";
import { siteConfig } from "@/config/site-config";
import { SiteHeader } from "@/components/layout/site-header";

import localFont from "next/font/local";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/providers/translations-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { EdgeStoreProvider } from "@/providers/edgestore-provider";
import { title } from "process";

const almarai = localFont({
  src: [
    {
      path: "../../../public/fonts/Almarai/Almarai-Regular.ttf",
      weight: "400",
    },
    {
      path: "../../../public/fonts/Almarai/Almarai-Bold.ttf",
      weight: "700",
    },
  ],
  variable: "--font-almarai",
});


export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, ["common"]);
  return {
  title: {
    default: t("common:metadata.title.default"),
    separator: `%s | ${t("common:metadata.appName")}`,
  },
  metadataBase: siteConfig.metadataBase,
  manifest: siteConfig.manifest,
  applicationName: t("common:metadata.appName"),
  creator: siteConfig.creator,
  authors: [
    {
      name: siteConfig.authors[0].name,
      url: siteConfig.authors[0].url,
    },
  ],
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    siteName: t("common:metadata.appName"),
    locale: "ar_DZ",
    url: siteConfig.metadataBase,
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
    title:t("common:metadata.title.default"),
    creator: "@MohamedLifa7",
    card: "summary_large_image",
    images: ["https://razinpay.com/twitter-og-image.png"],
  },
  keywords: [
    t("common:metadata.keywords.[]"),
    t("common:metadata.keywords.[1]"),
    t("common:metadata.keywords.[2]"),
    t("common:metadata.keywords.[3]"),
    t("common:metadata.keywords.[4]"),
  ],

  }
}
export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const session = await auth();
  const i18nNamespaces = ["landing", "shared", "dashboard", "common", "payment"];
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <SessionProvider session={session}>
      <EdgeStoreProvider>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <html lang={locale} dir={dir(locale)} >
          <body className={almarai.className}>
            <Toaster richColors/>
            <SiteHeader />
            {children}
            <SiteFooter />
          </body>
        </html>
      </TranslationsProvider>
      </EdgeStoreProvider>
    </SessionProvider>
  );
}

// https://www.escrow.com/login-page?tid=13008037