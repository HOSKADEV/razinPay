"use client";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const scrolled = useScrollTop();
  const pathname = usePathname();
  // console.log(pathname)
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        scrolled || (pathname !== "/fr" && pathname !== "/")
          ? "bg-white"
          : "bg-transparent",
      )}
    >
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center"></nav>
        </div>
      </div>
    </header>
  );
}
