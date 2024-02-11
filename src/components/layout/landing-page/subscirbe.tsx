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
    <section className="mb-32 mt-60 space-y-6 text-center md:container max-md:px-2 lg:px-32">
      <div className="flex flex-col items-center justify-center space-y-6 rounded-md bg-muted-foreground py-24 shadow-md max-md:px-4">
        <h2 className="text-2xl font-bold text-primary">
          {t("subscribe.heading")}
        </h2>
        <Separator />
        <form className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex h-9 w-full items-center px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <Input
                className="block w-full rounded-lg border border-border p-3 pl-10 text-sm text-gray-900 placeholder:capitalize placeholder:text-gray-400 focus:border-primary"
                placeholder={t("subscribe.email")}
                type="email"
                id="email"
                required
              />
            </div>
          </div>
          <Button type="submit">{t("subscribe.action-button")}</Button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
