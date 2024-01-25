import initTranslations from "@/app/i18n";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import TranslationsProvider from "@/providers/TranslationsProvider";
const i18nNamespaces = ['landing']
export async function SiteHeader({locale}:{locale:string}) {
  const {resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}>
      <header className="sticky top-0 z-50 w-full bg-transparent ">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center">
            {/* {<UserMenu />} */}
            {/* <ThemeToggle /> */}
          </nav>
        </div>
      </div>
    </header>
    </TranslationsProvider>
  );
}
