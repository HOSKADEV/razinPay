import initTranslations from "@/app/i18n";
import OfferCard from "@/components/shared/offer-card";
import Image from "next/image";

const i18nNamespaces = ["razin-benefits"];

const RazinBenefitsPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <>
      <h3 className="text-3xl font-bold text-primary">{t("heading")}</h3>
      <div className="space-y-10 leading-8">
        <div className="space-y-6 rounded-md bg-gradient-to-b from-white to-muted-foreground p-4 shadow-md">
          <div>
            <h4 className="font-bold text-primary">{t("item-1.title")}</h4>
            <p>{t("item-1.desc")}</p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/item-1.svg"
              alt={t("item-1.title")}
              width={180}
              height={170}
            />
          </div>
        </div>
        <div className="space-y-6 rounded-md bg-gradient-to-b from-white to-muted-foreground p-4 shadow-md">
          <div>
            <h4 className="font-bold text-primary">{t("item-2.title")}</h4>
            <p>{t("item-2.desc")}</p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/item-2.svg"
              alt={t("item-2.title")}
              width={180}
              height={170}
            />
          </div>
        </div>
        <div className="space-y-6 rounded-md bg-gradient-to-b from-white to-muted-foreground p-4 shadow-md">
          <div>
            <h4 className="font-bold text-primary">{t("item-3.title")}</h4>
            <p>{t("item-3.desc")}</p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/item-3.svg"
              alt={t("item-3.title")}
              width={180}
              height={170}
            />
          </div>
        </div>
        <div className="space-y-6 rounded-md bg-gradient-to-b from-white to-muted-foreground p-4 shadow-md">
          <div>
            <h4 className="font-bold text-primary">{t("item-4.title")}</h4>
            <p>{t("item-4.desc")}</p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/item-4.svg"
              alt={t("item-4.title")}
              width={180}
              height={170}
            />
          </div>
        </div>
        <div className="space-y-6 rounded-md bg-gradient-to-b from-white to-muted-foreground p-4 shadow-md">
          <div>
            <h4 className="font-bold text-primary">{t("item-5.title")}</h4>
            <p>{t("item-5.desc")}</p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/item-5.svg"
              alt={t("item-5.title")}
              width={180}
              height={170}
            />
          </div>
        </div>
        <OfferCard locale={locale} />
      </div>
    </>
  );
};

export default RazinBenefitsPage;
