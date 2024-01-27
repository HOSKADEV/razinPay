"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useTranslation } from "react-i18next";
import { LangToggle } from "../i18n/lang-toggle";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation('landing');
  const currentLocale = i18n.language;
  return (
    <div className="mr-4 hidden md:flex items-center justify-between w-full">
      <Link
        href={`/${currentLocale}`}
        className="mx-6 flex items-center space-x-2 text-primary"
      >
        <Icons.logo className="" />
      </Link>
      <nav className="flex items-center space-x-4 text-base font-medium rtl:space-x-reverse">
        <Link
          href={`${currentLocale}/consumers`}
          className={cn(
            "transition-colors hover:text-white/80",
            pathname?.startsWith("/consumers")
              ? "text-white"
              : "text-white",
          )}
        >
          {t("nav-bar.nav-item-1")}
        </Link>
        <Link
          href={`${currentLocale}/borker`}
          className={cn(
            "transition-colors hover:text-white/80",
            pathname?.startsWith("/borker")
              ? "text-white"
              : "text-white",
          )}
        >
          {t("nav-bar.nav-item-2")}
        </Link>
        <Link
          href={`${currentLocale}/sellers`}
          className={cn(
            "transition-colors hover:text-white/80",
            pathname?.startsWith("/sellers")
              ? "text-white"
              : "text-white",
          )}
        >
          {t("nav-bar.nav-item-3")}
        </Link>
        <Link
          href={`${currentLocale}/help`}
          className={cn(
            "transition-colors hover:text-white/80",
            pathname?.startsWith("/help")
              ? "text-white"
              : "text-white",
          )}
        >
          {t("nav-bar.nav-item-4")}
        </Link>
      </nav>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <LangToggle/>
        <Button variant="ghost" size="icon" className="text-white"><Search/></Button>
      </div>
      <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="ghost" className="text-white">{t("nav-bar.login")}</Button>
        <Button>{t("nav-bar.register")}</Button>
      </div>

      
    </div>
  );
}
