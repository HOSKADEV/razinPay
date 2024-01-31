import initTranslations from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
interface SubscribeParams {
  params: {
    locale: string;
    i18nNamespaces: string[];
  };
}

const Subscribe = async ({ params: { locale, i18nNamespaces } }: SubscribeParams) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <section className="container mb-36 space-y-6 lg:px-32 text-center">
      <div className="flex flex-col justify-center items-center space-y-6 bg-muted-foreground py-24 shadow-md rounded-md">
        <h2 className="text-primary font-bold text-2xl">{t("subscribe.heading")}</h2>
        <form className="flex space-x-4 rtl:space-x-reverse items-center">
            <p className="uppercase">{t("subscribe.email")}</p>
            <div className="flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1">
                <Mail className="text-muted-foreground"/>
                <Input type="email" className="border-none ring-0 focus:ring-0 focus-visible:ring-0"/>
            </div>
            <Button>{t("subscribe.action-button")}</Button>
        </form>
      </div>
    </section>
  );
};

export default Subscribe;
