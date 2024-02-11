"use client";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { LoginButton } from "../auth/login-button";
import Link from "next/link";
import { LogoutButton } from "../auth/logout-button";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { LogOut } from "lucide-react";
import { LangToggle } from "../i18n/lang-toggle";
import { UserButton } from "../auth/user-button";

export function SiteHeader() {
  const scrolled = useScrollTop();
  const pathname = usePathname();
  const session = useSession();
  const { t } = useTranslation("landing");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        scrolled || (pathname !== "/fr" && pathname !== "/")
          ? "bg-white shadow-md"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-14 items-center justify-between">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <LangToggle
                className={
                  scrolled || (pathname !== "/fr" && pathname !== "/")
                    ? "text-black"
                    : "text-white"
                }
              />
            </div>
            {!session.data && (
              <>
                <Button
                  variant="ghost"
                  className={
                    scrolled || (pathname !== "/fr" && pathname !== "/")
                      ? "text-black"
                      : "text-white"
                  }
                >
                  <LoginButton>{t("nav-bar.login")}</LoginButton>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/auth/register">{t("nav-bar.register")}</Link>
                </Button>
              </>
            )}
            {session.data && (
              <UserButton/>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
