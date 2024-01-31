import Hero from "@/components/layout/landing-page/hero";
import Services from "@/components/layout/landing-page/services";
import Steps from "@/components/layout/landing-page/steps";
import Subscribe from "@/components/layout/landing-page/subscirbe";
const i18nNamespaces = ["landing", "shared"];

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main className="">
      <Hero params={{ locale, i18nNamespaces }} />
      <Steps params={{ locale, i18nNamespaces }} />
      <Services params={{ locale, i18nNamespaces }} />
      <Subscribe params={{ locale, i18nNamespaces }} />
    </main>
  );
}
