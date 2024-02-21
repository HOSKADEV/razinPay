"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Separator } from "../ui/separator";
import { Icons } from "../icons";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Facebook } from "lucide-react";

export function SiteFooter() {
  const { t } = useTranslation("landing");

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 flex flex-col space-y-4 md:mb-0">
            <Link href="/" className="flex items-center">
              <Icons.logo className="me-3 h-12" />
            </Link>
            <p className="md:w-96">{t("footer.desc")}</p>
            <div className="mt-4 flex space-x-4 sm:mt-0 sm:justify-start rtl:space-x-reverse">
              <a href="#" className="text-secondary">
                <InstagramLogoIcon className="h-6 w-6" />
                <span className="sr-only">Instagram page</span>
              </a>
              <a href="#" className="text-secondary">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook page</span>
              </a>
              <a href="#" className="text-secondary">
                <LinkedInLogoIcon className="h-6 w-6" />
                <span className="sr-only">Linkedin page</span>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-3 sm:gap-6">
            <div className="">
              <h3 className="text-sm font-semibold uppercase">
                {t("footer.services.title")}
              </h3>
              <Separator className="my-4 text-muted-foreground" />
              <ul className="space-y-4 font-medium text-muted-foreground">
                <li>
                  <Link href="/consumers-benefits" className="hover:underline">
                    {t("footer.services.item-1")}
                  </Link>
                </li>
                <li>
                  <Link href="/brokers-services" className="hover:underline">
                    {t("footer.services.item-2")}
                  </Link>
                </li>
                <li>
                  <Link href="/sellers-services" className="hover:underline">
                    {t("footer.services.item-3")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase">
                {t("footer.support.title")}
              </h3>
              <Separator className="my-4 text-muted-foreground" />
              <ul className="space-y-4 font-medium text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:underline">
                    {t("footer.support.item-1")}
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    {t("footer.support.item-2")}
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    {t("footer.support.item-3")}
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:underline">
                    {t("footer.support.item-4")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase">
                {t("footer.contact.title")}
              </h3>
              <Separator className="my-4 text-muted-foreground" />
              <ul className="space-y-4 font-medium text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:underline">
                    {t("footer.contact.item-1")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    {t("footer.contact.item-2")}
                  </Link>
                </li>
                <li>
                  <p className="hover:underline">+213666666666</p>
                </li>
                <li>
                  <a
                    href="mailto:contact@razinpay.com"
                    className="hover:underline"
                  >
                    contact@razinpay.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground sm:text-center">
            &copy; {new Date().getFullYear()} |{" "}
            <Link href="/" className="hover:underline">
              Razinpay |{" "}
            </Link>{" "}
            {t("footer.copyright")}.
          </span>
        </div>
      </div>
    </footer>
  );
}
