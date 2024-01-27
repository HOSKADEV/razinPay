"use client";

import * as React from "react";
import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Icons } from "../icons";
export function LangToggle() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale:string) => {

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = '; expires=' + date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };
  return (
    <Select value={currentLocale} onValueChange={handleChange}  >
      <SelectTrigger className="text-white border-none focus:ring-0">
        <SelectValue placeholder="AR" className="flex space-x-4 my-4 rtl:space-x-reverse items-center"/>
      </SelectTrigger>
      <SelectContent align="end">
        <SelectItem value="fr"><div className="flex my-4 items-center"><Icons.frFlag className="h-5 w-5 mx-2"/> <span>FR</span></div></SelectItem>
        <SelectItem value="ar"><div className="flex my-4 items-center"><Icons.dzFlag className="h-5 w-5 mx-2"/> <span>AR</span></div></SelectItem>
      </SelectContent>
    </Select>
  );
}
