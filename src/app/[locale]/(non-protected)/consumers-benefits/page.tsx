import initTranslations from "@/app/i18n";
import OfferCard from "@/components/shared/offer-card";

const i18nNamespaces = ["consumers"];

const ConsumerBenefitsPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <>
      <div className="space-y-4">
        <h3 className="lg:-text-4xl text-lg font-bold text-primary md:text-2xl">
          {t("benefits.title")}
        </h3>
        <p className="font-semibold">{t("benefits.desc")}</p>
      </div>
      <div className="space-y-8 leading-8">
        <div>
          <h5 className="mb-2 text-xl font-semibold text-primary">
            {t("benefits.item-1-title")}
          </h5>
          <p className="break-words">{t("benefits.item-1-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold text-primary">
            {t("benefits.item-2-title")}
          </h5>
          <p className="break-words">{t("benefits.item-2-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold text-primary">
            {t("benefits.item-3-title")}
          </h5>
          <p className="break-words">{t("benefits.item-3-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold text-primary">
            {t("benefits.item-4-title")}
          </h5>
          <p className="break-words">{t("benefits.item-4-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold text-primary">
            {t("benefits.item-5-title")}
          </h5>
          <p className="break-words">{t("benefits.item-5-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold text-primary">
            {t("benefits.item-6-title")}
          </h5>
          <p className="break-words">{t("benefits.item-6-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold text-primary">
            {t("benefits.item-7-title")}
          </h5>
          <p className="break-words">{t("benefits.item-7-desc")}</p>
        </div>
        <div>
          <h5 className="mb-2 text-xl font-semibold text-primary">
            {t("benefits.item-8-title")}
          </h5>
          <p className="break-words">{t("benefits.item-8-desc")}</p>
        </div>
        <OfferCard locale={locale} />
      </div>
    </>
  );
};

export default ConsumerBenefitsPage;
