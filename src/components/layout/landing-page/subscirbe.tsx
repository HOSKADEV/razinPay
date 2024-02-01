import initTranslations from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
interface SubscribeParams {
  params: {
    locale: string;
    i18nNamespaces: string[];
  };
}

const Subscribe = async ({
  params: { locale, i18nNamespaces },
}: SubscribeParams) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <section className="container mb-32 mt-60 space-y-6 text-center lg:px-32">
      <div className="flex flex-col items-center justify-center space-y-6 rounded-md bg-muted-foreground py-24 shadow-md">
        <h2 className="text-2xl font-bold text-primary">
          {t("subscribe.heading")}
        </h2>
        <Separator />
        <form className="flex items-center space-x-4 rtl:space-x-reverse">
          <p className="uppercase">{t("subscribe.email")}</p>
          <div className="flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1">
            <Mail className="" />
            <Input
              type="email"
              className="border-none ring-0 focus:ring-0 focus-visible:ring-0"
              required
            />
          </div>
          <Button type="submit">{t("subscribe.action-button")}</Button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
