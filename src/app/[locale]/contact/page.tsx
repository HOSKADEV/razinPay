import initTranslations from "@/app/i18n";
import { Separator } from "@/components/ui/separator";

const i18nNamespaces = ["contact"];

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <main className="container w-3/4 leading-8">
      <h2 className="text-primary text-5xl mt-6">{t("title")}</h2>
      <p className="my-4">{t("desc")}</p>
      <Separator />
      <h2 className="text-primary text-3xl mt-8">{t("mail.title")}</h2>
      <p className="my-4">{t("mail.content-1")}</p>
      <p className="my-4">{t("mail.content-2")} <span className="text-primary underline">{t("mail.email")}</span></p>
    <div className="my-16">

      <h2 className="text-primary text-3xl mt-6">{t("phone.title")}</h2>
        <p className="my-4">{t("phone.desc")}</p>
        <p className="my-4">{t("phone.num-1")}</p>
        <p className="my-4">{t("phone.num-2")}</p>
        <p className="my-4">{t("phone.num-3")}</p>
    </div>

        <h2 className="text-primary text-3xl mt-6">{t("address.title")}</h2>
        <p className="my-4 mb-24">{t("address.addr")}</p>
    </main>
  );
}