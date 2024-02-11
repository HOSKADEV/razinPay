import initTranslations from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
interface FeaturesParams {
  params: {
    locale: string;
    i18nNamespaces: string[];
  };
}

const Features = async ({
  params: { locale, i18nNamespaces },
}: FeaturesParams) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <section className="container my-32 space-y-28 lg:px-32">
      <div className="flex flex-col items-center justify-center md:flex-row">
        <Image src="/features/feat-1.svg" alt="" width={290} height={260} />
        <div>
          <h3 className="rounded-md bg-muted-foreground px-2 py-4 text-xl font-semibold text-primary shadow-sm">
            {t("features.feat-1-title")}
          </h3>
          <p className="mt-4 p-4">{t("features.feat-1-desc")}</p>
          <div className="px-4">
            <Button variant="outline">{t("features.view-more")}</Button>
          </div>
        </div>
      </div>
      <Separator className="my-10" />
      <div className="flex flex-col-reverse items-center justify-center md:flex-row">
        <div>
          <h3 className="rounded-md bg-muted-foreground px-2 py-4 text-xl font-semibold text-primary shadow-sm">
            {t("features.feat-2-title")}
          </h3>
          <p className="mt-4 p-4">{t("features.feat-2-desc")}</p>
          <div className="px-4">
            <Button variant="outline">{t("features.view-more")}</Button>
          </div>
        </div>
        <Image src="/features/feat-2.svg" alt="" width={290} height={260} />
      </div>
      <Separator className="my-10" />
      <div className="flex flex-col items-center justify-center md:flex-row">
        <Image src="/features/feat-3.svg" alt="" width={290} height={260} />
        <div>
          <h3 className="rounded-md bg-muted-foreground px-2 py-4 text-xl font-semibold text-primary shadow-sm">
            {t("features.feat-3-title")}
          </h3>
          <p className="mt-4 p-4">{t("features.feat-3-desc")}</p>
          <div className="px-4">
            <Button variant="outline">{t("features.view-more")}</Button>
          </div>{" "}
        </div>
      </div>
    </section>
  );
};

export default Features;
