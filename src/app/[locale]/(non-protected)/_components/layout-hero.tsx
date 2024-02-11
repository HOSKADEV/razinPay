"use client";

import Trading from "@/components/shared/trading";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const LayoutHero = () => {
  const pathname = usePathname();
  const { t } = useTranslation("shared");
  return (
    <div className="relative">
      {((pathname?.includes("/about") || pathname?.includes("/fr/about")) && (
        <>
          <Image src="/about.svg" alt="" width={1980} height={520} />
          <h2 className="absolute right-1/4 top-1/2 -translate-y-1/2 translate-x-1/4 text-center text-xl md:text-3xl lg:text-7xl font-semibold text-white">
            {t("about.heading")}{" "}
            <span className="text-secondary">Razinpay</span>؟
          </h2>
        </>
      )) ||
        ((pathname?.includes("/consumers-benefits") ||
          pathname?.includes("/fr/consumers-benefits")) && (
          <>
            <Image
              src="/consumers/consumers-benefits-hero.svg"
              alt=""
              width={1980}
              height={520}
            />
            <h2 className="absolute right-1/4 top-1/2 -translate-y-1/2 translate-x-1/4 text-center text-xl md:text-3xl lg:text-7xl font-semibold text-white">
              {t("consumers.heading")} <br />
              <span className="text-secondary">Razinpay</span>
            </h2>
          </>
        )) ||
        ((pathname?.includes("/calculate-fees") ||
          pathname?.includes("/fr/calculate-fees")) && (
          <>
            <Image src="/calculate-fees.svg" alt="" width={1980} height={520} />
            <h2 className="absolute right-1/4 top-1/2 -translate-y-1/2 translate-x-1/4 text-center text-xl md:text-3xl lg:text-7xl font-semibold text-white">
              {t("calculate-fees.heading")}{" "}
              <span className="text-secondary">Razinpay</span>
            </h2>
          </>
        )) ||
        ((pathname?.includes("/brokers-services") ||
          pathname?.includes("/fr/brokers-services")) && (
          <div className=" bg-muted-foreground py-8">
            <div className="flex flex-row-reverse items-center justify-around container">
            <Image
              src="/brokers-services.svg"
              alt=""
              width={541.79}
              height={380}
              className="hidden md:block"
            />
            <div className="space-y-6">
              <h2 className="text-left text-3xl font-semibold text-primary rtl:text-right">
                {t("brokers-services.heading.first")}{" "}
                <span className="text-secondary">Razinpay</span> <br />
                {t("brokers-services.heading.second")}
              </h2>
              <Trading />
            </div>
            </div>
          </div>
        )) ||
        ((pathname?.includes("/sellers-services") ||
          pathname?.includes("/fr/sellers-services")) && (
          <div className="bg-muted-foreground py-8">
            <div className="flex flex-row-reverse items-center justify-around container">
            <Image
              src="/sellers-services.svg"
              alt=""
              width={541.79}
              height={380}
              className="hidden md:block"
            />
            <div className="space-y-6">
              <h2 className="text-left text-3xl font-semibold text-primary rtl:text-right">
                {t("sellers-services.heading.first")}{" "}
                <span className="text-secondary">Razinpay</span> <br />
                {t("sellers-services.heading.second")}
              </h2>
              <Trading />
            </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LayoutHero;
