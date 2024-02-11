"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import Link from "next/link";
const Trading = () => {
  const { t } = useTranslation("shared");
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center space-x-2 rounded-md bg-white text-foreground">
          <Select>
            <SelectTrigger className="w-[180px] border-none">
              <SelectValue placeholder={t("trading.sell")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">{t("trading.sell")}</SelectItem>
              <SelectItem value="dark">{t("trading.sell")}</SelectItem>
              <SelectItem value="system">{t("trading.sell")}</SelectItem>
            </SelectContent>
          </Select>
          <Separator orientation="vertical" />
          <Select>
            <SelectTrigger className="border-none">
              <SelectValue placeholder={t("trading.domain")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">{t("trading.domain")}</SelectItem>
              <SelectItem value="dark">{t("trading.domain")}</SelectItem>
              <SelectItem value="system">{t("trading.domain")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center rounded-md bg-white px-2 text-foreground">
          <form
            action=""
            className="flex items-center space-x-4 rtl:space-x-reverse"
          >
            <p>{t("trading.for")}</p>{" "}
            <Input type="text" placeholder="80000 DA" className="border-none" />
          </form>
          <Select>
            <SelectTrigger className="border-none">
              <SelectValue placeholder={t("trading.currency.dz")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">{t("trading.currency.dz")}</SelectItem>
              <SelectItem value="dark">{t("trading.currency.eu")}</SelectItem>
              <SelectItem value="system">{t("trading.currency.uk")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="">
        <Button asChild className="mt-8" size="lg">
          <Link href="/dashboard">
          {t("action-button")}
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Trading;
