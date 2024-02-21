import initTranslations from "@/app/i18n";
import { getDealById } from "@/data/deal";
import React from "react";
import CopyIdComponent from "@/components/copy-id";
import { currentUser } from "@/lib/auth";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { getUserById } from "@/data/user";

const i18nNamespaces = ["dashboard", "common"];

const DealLayout = async ({
  params,
  children,
}: {
  params: { locale: string; deal: string };
  children: React.ReactNode;
}) => {
  const { t } = await initTranslations(params.locale, i18nNamespaces);
  const deal = await getDealById(params.deal);
  const user = await currentUser();
  if (!deal) {
    return <div>Deal not found</div>;
  }
  const party1 = await getUserById(deal.party1Id)
  if (party1?.email !== user?.email && deal.party2Email !== user?.email) {
    // TODO: Redirect to 404 page
  }
  return (
    <section className="space-y-8 px-3 py-8 md:container">
      <div className="space-y-2 rounded-md bg-white p-2 shadow-md md:p-10 lg:px-36 lg:py-16">
        <div>
          <h2 className="text-xl font-bold text-primary"> {deal?.name} </h2>
          <time
            dateTime={deal.createdAt.toDateString()}
            className="text-gray-800"
          >
            {deal.createdAt.toDateString()}
          </time>
          <p>
            {t("home.start-deal.deal-id")} #{deal.id}{" "}
            <CopyIdComponent id={deal.id} className="text-primary" />
          </p>
          <p>
            <span className="text-primary">{party1?.email}</span>{" "}
            {" " +
              t(`home.start-deal.roles.${deal.role}.one`) +
              " " +
              deal.itemName +
              " " +
              t(`home.start-deal.roles.${deal.role}.two`)}{" "}
            <span className="text-primary">{deal.party2Email}</span>
            {t(`home.start-deal.duration`) +
              " " +
              deal.duration +
              " " +
              t(`home.start-deal.days`)}
          </p>
        </div>
        <Separator />
        <div>{children}</div>
      </div>
      <div className="space-y-6 rounded-md bg-white p-2 shadow-md md:p-10 lg:px-36 lg:py-16">
        <h2 className="text-xl font-bold text-primary">
          {t("home.start-deal.item-details.heading")}
        </h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-gray-700">
            <p>{t("home.start-deal.item-details.item-name")}</p>{" "}
            <p>{deal.itemName}</p>
          </div>
          <div className="flex items-center justify-between text-gray-700">
            <p>{t("home.start-deal.item-details.description")}</p>{" "}
            <p>{deal.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <p>{t("home.start-deal.item-details.sub-total")}</p>{" "}
          <p>{deal.price}</p>
        </div>
        <div className="flex items-center justify-between text-gray-700">
          <p>{t("home.start-deal.item-details.razin-fees")} Razinpay</p>{" "}
          <p>{deal.price}</p>
        </div>
        <div className="flex items-center justify-between font-semibold text-primary">
          <p>{t("home.start-deal.item-details.total")}</p> <p>{deal.price}</p>
        </div>
      </div>
    </section>
  );
};

export default DealLayout;
