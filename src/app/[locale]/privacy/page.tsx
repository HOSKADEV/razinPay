import initTranslations from "@/app/i18n";
import { Separator } from "@/components/ui/separator";

const i18nNamespaces = ["privacy"];

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <main className="container w-3/4 leading-8">
      <h2 className="text-primary text-5xl mt-5">{t("privacy")}</h2>
      <p className="my-4">{t("date")}</p>
      <Separator />
      <p className="my-5">{t("title")}</p>

      <div className="font-bold mt-3 flex">
  <span className="mr-2">1.</span>
  <div className="ms-4">{t("content-1")}</div>
</div>
<div className="font-bold mt-3 flex">
  <span className="mr-2">2.</span>
  <div className="ms-4">{t("content-2")}</div>
</div>
<div className="font-bold mt-3 flex">
  <span className="mr-2">3.</span>
  <div className="ms-4">{t("content-3")}</div>
</div>
<div className="font-bold mt-3 flex">
  <span className="mr-2">4.</span>
  <div className="ms-4">{t("content-4")}</div>
</div>
<div className="font-bold mt-3 flex">
  <span className="mr-2">5.</span>
  <div className="ms-4">{t("content-5")}</div>
</div>
<div className="font-bold mt-3 flex">
  <span className="mr-2">6.</span>
  <div className="ms-4">{t("content-6")}</div>
</div>
<div className="font-bold mt-3 flex">
  <span className="mr-2">7.</span>
  <div className="ms-4">{t("content-7")}</div>
</div>
<div className="font-bold mt-3 flex">
  <span className="mr-2">8.</span>
  <div className="ms-4">{t("content-8")}</div>
</div>
<div className="font-bold mt-3 flex">
  <span className="mr-2">9.</span>
  <div className="ms-4">{t("content-9")}</div>
</div>
<div className="font-bold mt-3 flex">
  <span className="mr-2">10.</span>
  <div className="ms-4">{t("content-10")}</div>
</div>
<div className="font-bold mt-3 mb-28 flex">
  <span className="mr-2">11.</span>
  <div className="ms-4">{t("content-11")}</div>
</div>

    </main>
  );
}
