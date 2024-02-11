import initTranslations from "@/app/i18n";
import Link from "next/link";

const i18nNamespaces = ["shared"];
const Faq = async ({ locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <aside className="hidden space-y-6 md:block">
      <h4 className="font-semibold text-primary">{t("sidebar.heading")}</h4>
      <div className="flex flex-col space-y-2 leading-6 text-secondary">
        <Link href="#" className="underline-offset-4 hover:underline">
          {t("sidebar.link-1")}
        </Link>
        <Link href="#" className="underline-offset-4 hover:underline">
          {t("sidebar.link-2")}
        </Link>
        <Link href="#" className="underline-offset-4 hover:underline">
          {t("sidebar.link-3")}
        </Link>
        <Link href="#" className="underline-offset-4 hover:underline">
          {t("sidebar.link-4")}
        </Link>
        <Link href="#" className="underline-offset-4 hover:underline">
          {t("sidebar.link-5")}
        </Link>
        <Link href="#" className="underline-offset-4 hover:underline">
          {t("sidebar.link-6")}
        </Link>
      </div>
    </aside>
  );
};

export default Faq;
