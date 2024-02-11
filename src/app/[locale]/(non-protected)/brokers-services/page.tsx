import initTranslations from "@/app/i18n";
import OfferCard from "@/components/shared/offer-card";

const i18nNamespaces = ["brokers"];

const BrokersServicesPage = async ({
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
      <div className="space-y-8 pl-4 leading-8">
        <div className="space-y-6">
          <h5 className="mb-2 text-xl font-semibold text-primary">
            {t("item-1.title")}
          </h5>
          <p className="break-words">{t("item-1.desc")}</p>
        </div>
        <div className="space-y-6">
          <h5 className="mb-2 text-xl font-semibold text-primary">
            {t("item-2.title")}
          </h5>
          <ul className="list-disc px-4">
            <li>{t("item-2.ul.li-1")}</li>
            <li>{t("item-2.ul.li-2")}</li>
            <li>{t("item-2.ul.li-3")}</li>
            <li>{t("item-2.ul.li-4")}</li>
            <li>{t("item-2.ul.li-5")}</li>
            <li>{t("item-2.ul.li-6")}</li>
          </ul>
        </div>
        <div className="space-y-6">
          <h5 className="mb-2 text-xl font-semibold text-primary">
            {t("item-3.title")}
          </h5>
          <p className="break-words">{t("item-3.desc")}</p>
          <ul className="list-disc space-y-8 px-4">
            <li>{t("item-3.ul.li-1")}</li>
            <li>{t("item-3.ul.li-2")}</li>
            <li>{t("item-3.ul.li-3")}</li>
            <li>{t("item-3.ul.li-4")}</li>
            <li>{t("item-3.ul.li-5")}</li>
          </ul>
        </div>
        <OfferCard locale={locale} />
      </div>
    </>
  );
};

export default BrokersServicesPage;
