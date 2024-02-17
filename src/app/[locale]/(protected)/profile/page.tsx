import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { ProfileForm } from "./form";
import initTranslations from "@/app/i18n";

const i18nNamespaces = ["dashboard"];

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <section className="py-8 md:container px-3">
      <div className="space-y-6 rounded-md bg-white p-2 shadow-md md:p-10 lg:px-36 lg:py-16">
        <h2 className="text-xl font-bold text-primary">
          {t("profile.heading")}
        </h2>
        <Separator />
        <ProfileForm />
      </div>
    </section>
  );
}
