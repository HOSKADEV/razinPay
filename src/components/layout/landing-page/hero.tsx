import initTranslations from "@/app/i18n";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Trading from "@/components/shared/trading";
interface HeroParams {
  params: {
    locale: string;
    i18nNamespaces: string[];
  };
}

const Hero = async ({ params: { locale, i18nNamespaces } }: HeroParams) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <section className="relative -top-14 h-screen w-full overflow-hidden bg-[url('/hero/bg-with-logo-ar.png')] bg-cover bg-center bg-no-repeat text-white ltr:bg-[url('/hero/bg-with-logo-fr.png')]">
      <div className="container flex h-full justify-between px-6">
        <div className="flex flex-col justify-center rounded-sm px-6 text-left lg:max-w-md xl:max-w-lg rtl:text-right">
          <h1 className="text-3xl font-bold sm:text-3xl">
            {t("hero-section.hero-header")} <br />{" "}
            <span className="text-secondary">RAZINPAY.COM</span>
          </h1>
          <p className="mb-8 mt-6 text-lg sm:mb-12">
            {t("hero-section.hero-desc")}
          </p>
          <Trading />
        </div>
        <div className="relative mt-0 hidden h-full items-center justify-center px-6 md:flex rtl:left-24">
          <div className="flex h-full">
            <div className="flex flex-col items-center justify-center text-center">
              <Image
                src="/hero/hero-banner.svg"
                alt=""
                className="object-contain"
                width={360}
                height={360}
              />
              <ul className="flex space-x-2 rtl:space-x-reverse">
                <li className="h-2 w-2 rounded-full bg-white"></li>
                <li className="h-2 w-2 rounded-full bg-white"></li>
                <li className="h-2 w-2 rounded-full bg-white"></li>
                <li className="h-2 w-2 rounded-full bg-white"></li>
                <li className="h-2 w-2 rounded-full border border-white"></li>
              </ul>
              <p className="mt-6 w-64 text-2xl font-semibold">
                {t("hero-section.banner")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
