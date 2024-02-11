import initTranslations from "@/app/i18n";
import OfferCard from "@/components/shared/offer-card";
import Tutorial from "../_components/tutorial";

const i18nNamespaces = ["about"];

const AboutPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-primary">{t("title")}</h3>
        <p className="font-semibold">{t("desc")}</p>
      </div>
      <div className="space-y-8 leading-8">
        <p>{t("item-1")}</p>
        <p>{t("item-2")}</p>
        <p>{t("item-3")}</p>
        <p>{t("item-4")}</p>
        <p>{t("item-5")}</p>
        <p>{t("item-6")}</p>
        <p>{t("item-7")}</p>
        <p>{t("item-8")}</p>
        <Tutorial />
        <OfferCard locale={locale} />
      </div>
    </>
  );
};

export default AboutPage;
