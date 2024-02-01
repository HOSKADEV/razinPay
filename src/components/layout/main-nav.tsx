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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
export function MainNav() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation("landing");
  const currentLocale = i18n.language;
  const scrolled = useScrollTop();
  const consumers: { title: string; href: string }[] = [
    {
      title: t("nav-bar.consumers.item-1"),
      href: "/consumers/benefits",
    },
    {
      title: t("nav-bar.consumers.item-2"),
      href: "/calculate-fees",
    },
    {
      title: t("nav-bar.consumers.item-3"),
      href: "/learn-more",
    },
  ];
  const sellers: { title: string; href: string }[] = [
    {
      title: t("nav-bar.sellers.item-1"),
      href: "/seller/benefits",
    },
    {
      title: t("nav-bar.sellers.item-2"),
      href: "/calculate-fees",
    },
    {
      title: t("nav-bar.sellers.item-3"),
      href: "/learn-more",
    },
  ];
  const brokers: { title: string; href: string }[] = [
    {
      title: t("nav-bar.brokers.item-1"),
      href: "/seller-benefits",
    },
    {
      title: t("nav-bar.brokers.item-2"),
      href: "/calculate-fees",
    },
    {
      title: t("nav-bar.brokers.item-3"),
      href: "/learn-more",
    },
  ];
  const help: { title: string; href: string }[] = [
    {
      title: t("nav-bar.help.item-1"),
      href: "/seller-benefits",
    },
    {
      title: t("nav-bar.help.item-2"),
      href: "/calculate-fees",
    },
    {
      title: t("nav-bar.help.item-3"),
      href: "/learn-more",
    },
  ];
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
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  scrolled || (pathname !== "/fr" && pathname !== "/")
                    ? ""
                    : "bg-transparent text-white",
                )}
              >
                {" "}
                {t("nav-bar.consumers.title")}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="space-y-6 p-6">
                <ul className="grid w-[400px] grid-cols-3 gap-3 p-4 md:w-[500px] lg:w-[800px]">
                  {consumers.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    />
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-4 border-2 border-primary p-4 rtl:flex-row-reverse">
                  <p>{t("nav-bar.desc")}</p>
                  <Button variant="outline">
                    {t("nav-bar.action-button")}
                  </Button>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  scrolled || (pathname !== "/fr" && pathname !== "/")
                    ? ""
                    : "bg-transparent text-white",
                )}
              >
                {" "}
                {t("nav-bar.brokers.title")}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="space-y-6 p-6">
                <ul className="grid w-[400px] grid-cols-3 gap-3 p-4 md:w-[500px] lg:w-[800px]">
                  {brokers.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    />
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-4 border-2 border-primary p-4 rtl:flex-row-reverse">
                  <p>{t("nav-bar.desc")}</p>
                  <Button variant="outline">
                    {t("nav-bar.action-button")}
                  </Button>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  scrolled || (pathname !== "/fr" && pathname !== "/")
                    ? ""
                    : "bg-transparent text-white",
                )}
              >
                {" "}
                {t("nav-bar.sellers.title")}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="space-y-6 p-6">
                <ul className="grid w-[400px] grid-cols-3 gap-3 p-4 md:w-[500px] lg:w-[800px]">
                  {sellers.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    />
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-4 border-2 border-primary p-4 rtl:flex-row-reverse">
                  <p>{t("nav-bar.desc")}</p>
                  <Button variant="outline">
                    {t("nav-bar.action-button")}
                  </Button>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  scrolled || (pathname !== "/fr" && pathname !== "/")
                    ? ""
                    : "bg-transparent text-white",
                )}
              >
                {" "}
                {t("nav-bar.help.title")}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="space-y-6 p-6">
                <ul className="grid w-[400px] grid-cols-3 gap-3 p-4 md:w-[500px] lg:w-[800px]">
                  {help.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    />
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-4 border-2 border-primary p-4 rtl:flex-row-reverse">
                  <p>{t("nav-bar.desc")}</p>
                  <Button variant="outline">
                    {t("nav-bar.action-button")}
                  </Button>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <LangToggle
          className={
            scrolled || (pathname !== "/fr" && pathname !== "/")
              ? "text-black"
              : "text-white"
          }
        />
      </div>
      <div className="space-x-4 rtl:space-x-reverse">
        <Button
          variant="ghost"
          className={
            scrolled || (pathname !== "/fr" && pathname !== "/")
              ? "text-black"
              : "text-white"
          }
        >
          {t("nav-bar.login")}
        </Button>
        <Button variant="secondary">{t("nav-bar.register")}</Button>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-center">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
