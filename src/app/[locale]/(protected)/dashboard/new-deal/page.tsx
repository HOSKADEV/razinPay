import initTranslations from "@/app/i18n";
import { Separator } from "@/components/ui/separator";
import NewItemForm from "./form";

const i18nNamespaces = ["dashboard"];

const AddNewDealPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <section className="py-8 md:container">
      <div className="space-y-6 rounded-md bg-white p-2 shadow-md md:p-10 lg:px-36 lg:py-16">
        <h2 className="text-xl font-bold text-primary">
          {t("home.new-deal.heading")}
        </h2>
        <Separator />
        <NewItemForm />
      </div>
    </section>
  );
};

export default AddNewDealPage;
