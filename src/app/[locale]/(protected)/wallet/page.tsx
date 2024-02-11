import initTranslations from "@/app/i18n"
import { auth } from "@/auth"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
const i18nNamespaces = ["dashboard"]

const MyWalletPage = async({params:{locale}}:{params: { locale: string };}) => {
 const {t} = await initTranslations(locale, i18nNamespaces)
 const session = await auth()

  return (
    <div className="container">
      <div className="flex justify-between items-center py-8">
        <h2 className="text-primary font-bold text-xl">{t("wallet.heading")}</h2>
        <Button variant="secondary">{t("wallet.new-deal-btn")}</Button>
      </div>
      <div className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-md shadow-md font-bold md:text-xl">
            <div>
                <p >{t("wallet.account-nbr")} {session?.user.id}</p>
            </div>
            <Separator className="my-4"/>
            <div>
                <p className="flex justify-between items-center"><span>{t("wallet.total")}</span> <span> DA 10000.00</span></p>
            </div>
      </div>
      <Separator className="my-8"/>
      <div>
      </div>
    </div>
  )
}

export default MyWalletPage