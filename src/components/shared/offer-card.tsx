import initTranslations from "@/app/i18n";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
const i18nNamespaces = ["shared"];
const OfferCard = async ({ locale }: { locale: string }) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <>
      <div className="flex-col items-center space-y-6 rounded-lg bg-muted-foreground p-10 text-center">
        <p className="text-2xl font-bold text-primary">{t("card-title")}</p>
        <Button variant="outline" size="lg" asChild>
          <Link href="/dashboard">{t("action-button")}</Link>
        </Button>
      </div>
      <div>
        <h5 className="mb-2 text-xl font-semibold text-primary">
          {t("more-support.title")}
        </h5>
        <p className="break-words">
          {t("more-support.desc")}{" "}
          <Link href="/contact" className="text-secondary hover:underline">
            {t("more-support.contact-link")}
          </Link>{" "}
          .
        </p>
      </div>
    </>
  );
};

export default OfferCard;
