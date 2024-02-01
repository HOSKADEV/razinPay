import initTranslations from "@/app/i18n";
import { Button } from "@/components/ui/button";
import Image from "next/image";
interface StepsParams {
  params: {
    locale: string;
    i18nNamespaces: string[];
  };
}

const Steps = async ({ params: { locale, i18nNamespaces } }: StepsParams) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <section className="container mb-36 space-y-6 text-center lg:px-32 ">
      <div className="flex justify-center">
        <Image
          src="/steps/razin-big-heading-gradient.svg"
          alt="razin pay"
          width="925"
          height="171"
        />
      </div>
      <div>
        <h2 className="mb-2 text-xl font-bold text-primary md:text-4xl">
          {t("steps.heading")} <br className="hidden md:block" />{" "}
          <span className="text-secondary">RAZINPAY.COM</span>
        </h2>
        <p>{t("steps.desc")}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-7">
        <div className="flex flex-col items-center justify-center ">
          <Image
            src="/steps/step-1.svg"
            width="124"
            height="124"
            alt="Step 1"
          />
          <p>{t("steps.item-1")}</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <Image
            src="/steps/step-2.svg"
            width="124"
            height="124"
            alt="Step 1"
          />
          <p>{t("steps.item-2")}</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <Image
            src="/steps/step-3.svg"
            width="124"
            height="124"
            alt="Step 1"
          />
          <p>{t("steps.item-3")}</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <Image
            src="/steps/step-4.svg"
            width="124"
            height="124"
            alt="Step 1"
          />
          <p>{t("steps.item-4")}</p>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <Image
            src="/steps/step-5.svg"
            width="124"
            height="124"
            alt="Step 1"
          />
          <p>{t("steps.item-5")}</p>
        </div>
      </div>
      <div>
        <Button className="">{t("steps.action-button")}</Button>
      </div>
    </section>
  );
};

export default Steps;
