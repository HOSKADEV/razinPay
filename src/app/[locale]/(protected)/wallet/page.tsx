import initTranslations from "@/app/i18n";
import { auth } from "@/auth";
import CopyIdComponent from "@/components/copy-id";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
const i18nNamespaces = ["dashboard"];

const MyWalletPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const session = await auth();

  return (
    <div className="container">
      <div className="flex items-center justify-between py-8">
        <h2 className="text-xl font-bold text-primary">
          {t("wallet.heading")}
        </h2>
        <Button variant="secondary">{t("wallet.new-deal-btn")}</Button>
      </div>
      <div className="rounded-md bg-gradient-to-r from-primary to-secondary p-8 font-bold text-white shadow-md md:text-xl">
        <div>
          <p>
            {t("wallet.account-nbr")} {session?.user.id} <CopyIdComponent id={session?.user?.id!} className="text-white hover:text-primary"/>
          </p>
        </div>
        <Separator className="my-4" />
        <div>
          <p className="flex items-center justify-between">
            <span>{t("wallet.total")}</span> <span> DA 10000.00</span>
          </p>
        </div>
      </div>
      <Separator className="my-8" />
      <div></div>
    </div>
  );
};

export default MyWalletPage;
