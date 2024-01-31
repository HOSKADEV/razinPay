"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { useTranslation } from "react-i18next";
import { LangToggle } from "../i18n/lang-toggle";
import { Button } from "../ui/button";
import { useScrollTop } from "@/hooks/use-scroll-top";

export function MainNav() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation("landing");
  const currentLocale = i18n.language;
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "mr-4 hidden w-full items-center justify-between md:flex",
        scrolled ? "bg-white" : "bg-transparent",
      )}
    >
      <Link
        href={`/${currentLocale}`}
        className="mx-6 flex items-center space-x-2 text-primary"
      >
        <Icons.logo
          className={cn(
            scrolled || (pathname !== "/fr" && pathname !== "/")
              ? "hidden"
              : "block",
          )}
        />
        <Icons.logoWhiteBg
          className={cn(
            scrolled || (pathname !== "/fr" && pathname !== "/")
              ? "block"
              : "hidden",
          )}
        />
      </Link>
      <nav className="flex items-center space-x-4 text-base font-medium rtl:space-x-reverse">
        <Link
          href={`${currentLocale}/consumers`}
          className={cn(
            "transition-colors hover:text-white/80",
            pathname?.startsWith("/consumers")
              ? "text-muted-foreground"
              : scrolled
                ? "text-foreground"
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
              ? "text-muted-foreground"
              : scrolled
                ? "text-foreground"
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
              ? "text-muted-foreground"
              : scrolled
                ? "text-foreground"
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
              ? "text-muted-foreground"
              : scrolled
                ? "text-foreground"
                : "text-white",
          )}
        >
          {t("nav-bar.nav-item-4")}
        </Link>
      </nav>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <LangToggle />
      </div>
      <div className="space-x-4 rtl:space-x-reverse">
        <Button variant="ghost" className="text-white">
          {t("nav-bar.login")}
        </Button>
        <Button variant="secondary">{t("nav-bar.register")}</Button>
      </div>
    </div>
  );
}
