import initTranslations from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { Globe, ShipWheel, TabletSmartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface ServicesParams {
  params: {
    locale: string;
    i18nNamespaces: string[];
  };
}

const Services = async ({
  params: { locale, i18nNamespaces },
}: ServicesParams) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <section className="relative">
      <Image src="/services/bg.svg" width={884} height={600} alt="" className="absolute right-0 -z-50 hidden md:block"/>
      <div className="container space-y-12 lg:px-40 py-16">
        <h2 className="lg:mx-52 mb-2 text-center text-2xl md:text-4xl font-bold text-primary">
          {t("services.heading")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:text-left lg:rtl:text-right text-center">
          <div className="space-y-4 flex flex-col ">
            <Globe className="h-10 w-10 text-primary" />
            <h3 className="font-semibold">{t("services.item-1-title")}</h3>
            <p className="">{t("services.item-1-desc")}</p>
            <Link href="#" className="text-primary underline-offset-4 hover:underline mt-7 uppercase">{t("services.view-more")}</Link>
          </div>
          <div className="space-y-4 flex flex-col ">
            <ShipWheel className="h-10 w-10 text-primary" />
            <h3 className="font-semibold">{t("services.item-2-title")}</h3>
            <p className="">{t("services.item-2-desc")}</p>
            <Link href="#" className="text-primary underline-offset-4 hover:underline mt-7 uppercase">{t("services.view-more")}</Link>
          </div>
          <div className="space-y-4 flex flex-col ">
            <TabletSmartphone className="h-10 w-10 text-primary" />
            <h3 className="font-semibold">{t("services.item-3-title")}</h3>
            <p className="">{t("services.item-3-desc")}</p>
            <Link href="#" className="text-primary underline-offset-4 hover:underline mt-7 uppercase">{t("services.view-more")}</Link>
          </div>
          <div className="space-y-4 flex flex-col ">
            <Globe className="h-10 w-10 text-primary" />
            <h3 className="font-semibold">{t("services.item-4-title")}</h3>
            <p className="">{t("services.item-4-desc")}</p>
            <Link href="#" className="text-primary underline-offset-4 hover:underline mt-7 uppercase">{t("services.view-more")}</Link>
          </div>
          <div className="space-y-4 flex flex-col ">
            <Globe className="h-10 w-10 text-primary" />
            <h3 className="font-semibold">{t("services.item-5-title")}</h3>
            <p className="">{t("services.item-5-desc")}</p>
            <Link href="#" className="text-primary underline-offset-4 hover:underline mt-7 uppercase">{t("services.view-more")}</Link>
          </div>
          <div className="space-y-4 flex flex-col ">
            <Globe className="h-10 w-10 text-primary" />
            <h3 className="font-semibold">{t("services.item-5-title")}</h3>
            <p className="">{t("services.item-5-desc")}</p>
            <Link href="#" className="text-primary underline-offset-4 hover:underline mt-7 uppercase">{t("services.view-more")}</Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Button>
          {t("services.action-button")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
