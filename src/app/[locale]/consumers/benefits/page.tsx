import initTranslations from "@/app/i18n";
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link";

const i18nNamespaces = ["consumers"]

const ConsumerBenefitsPage = async ({
    params: { locale },
  }: {
    params: { locale: string };
}) => {
    const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <div className="text-left rtl:text-right">
        <Image src="/consumers/consumers-benifits-hero.svg" alt="" width={1980} height={520}/>
        <div className="flex items-start container flex-row justify-between my-20">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h3 className="font-bold text-3xl text-primary">{t("benefits.title")}</h3>
                    <p className="font-semibold">{t("benefits.desc")}</p>
                </div>
                <div className="space-y-6 border-l border-muted-foreground pl-4">
                        <div>
                            <h5 className="text-primary font-semibold">{t("benefits.item-1-title")}</h5>
                            <p>{t("benefits.item-1-desc")}</p>
                        </div>
                        <div>
                            <h5 className="text-primary font-semibold">{t("benefits.item-2-title")}</h5>
                            <p>{t("benefits.item-2-desc")}</p>
                        </div>
                        <div>
                            <h5 className="text-primary font-semibold">{t("benefits.item-3-title")}</h5>
                            <p>{t("benefits.item-3-desc")}</p>
                        </div>
                        <div>
                            <h5 className="text-primary font-semibold">{t("benefits.item-4-title")}</h5>
                            <p>{t("benefits.item-4-desc")}</p>
                        </div>
                        <div>
                            <h5 className="text-primary font-semibold">{t("benefits.item-5-title")}</h5>
                            <p>{t("benefits.item-5-desc")}</p>
                        </div>
                        <div>
                            <h5 className="text-primary font-semibold">{t("benefits.item-6-title")}</h5>
                            <p>{t("benefits.item-6-desc")}</p>
                        </div>
                        <div>
                            <h5 className="text-primary font-semibold">{t("benefits.item-7-title")}</h5>
                            <p>{t("benefits.item-7-desc")}</p>
                        </div>
                        <div>
                            <h5 className="text-primary font-semibold">{t("benefits.item-8-title")}</h5>
                            <p>{t("benefits.item-8-desc")}</p>
                        </div>

                </div>
            </div>
            <Separator orientation="vertical" className=""/>
            <aside className="space-y-6">
                <h4>{t("benefits.sidebar.heading")}</h4>
                <div className="flex flex-col space-y-2">
                    <Link href="#">{t("benefits.sidebar.link-1")}</Link>
                    <Link href="#">{t("benefits.sidebar.link-2")}</Link>
                    <Link href="#">{t("benefits.sidebar.link-3")}</Link>
                    <Link href="#">{t("benefits.sidebar.link-4")}</Link>
                    <Link href="#">{t("benefits.sidebar.link-5")}</Link>
                    <Link href="#">{t("benefits.sidebar.link-6")}</Link>
                </div>
            </aside>
        </div>
    </div>
  )
}

export default ConsumerBenefitsPage