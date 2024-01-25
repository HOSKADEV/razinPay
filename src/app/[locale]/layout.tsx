import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/auth'
import '@/styles/globals.css'
import { Toaster } from "@/components/ui/sonner";
import { dir } from 'i18next'
import i18nConfig from '@/i18nConfig'
import { siteConfig } from '@/config/site-config';
import { SiteHeader } from '@/components/layout/site-header';

import localFont from 'next/font/local'

const almarai = localFont({
  src: [
    {
      path: '../../../public/fonts/Almarai/Almarai-Regular.ttf',
      weight: '400'
    },
    {
      path: '../../../public/fonts/Almarai/Almarai-Bold.ttf',
      weight: '700'
    }
  ],
  variable: '--font-almarai'
})


export const metadata: Metadata = {
  ...siteConfig
}

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}


export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang={locale} dir={dir(locale)} >
        <body className={almarai.className}>
          <Toaster />
          <SiteHeader locale={locale}/>
          {children}
        </body>
      </html>
    </SessionProvider>
  )
}
