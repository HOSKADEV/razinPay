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

export const metadata: Metadata = {
  ...siteConfig,
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
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