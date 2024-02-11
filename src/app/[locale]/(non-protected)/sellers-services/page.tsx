import initTranslations from "@/app/i18n";
import OfferCard from "@/components/shared/offer-card";

const i18nNamespaces = ["sellers"];

const SellersServicesPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <>
      <div className="space-y-4">
        <p className="font-semibold">{t("desc")}</p>
      </div>
      <div className="space-y-8 leading-8">
        <div>
          <h5 className="mb-2 text-xl font-semibold">{t("item-1-title")}</h5>
          <p className="break-words">{t("item-1-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold">{t("item-2-title")}</h5>
          <p className="break-words">{t("item-2-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold">{t("item-3-title")}</h5>
          <p className="break-words">{t("item-3-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold">{t("item-4-title")}</h5>
          <p className="break-words">{t("item-4-desc")}</p>
        </div>
      </div>
      <div className="space-y-14 ">
        <p className="mb-2 text-lg font-medium">{t("footer")}</p>
        <h5 className="mb-2 text-xl font-semibold text-primary">
          {t("subheading")}
        </h5>
      </div>
      <div className="space-y-8 leading-8">
        <div>
          <h5 className="mb-2 text-xl font-semibold">{t("item-5-title")}</h5>
          <p className="break-words">{t("item-5-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold">{t("item-6-title")}</h5>
          <p className="break-words">{t("item-6-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold">{t("item-7-title")}</h5>
          <p className="break-words">{t("item-7-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold">{t("item-8-title")}</h5>
          <p className="break-words">{t("item-8-desc")}</p>
        </div>
        <OfferCard locale={locale} />
      </div>
    </>
  );
};

export default SellersServicesPage;
