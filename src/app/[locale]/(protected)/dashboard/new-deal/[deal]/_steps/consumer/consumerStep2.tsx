"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import type { Deal } from "@prisma/client";
import Link from "next/link";
export const ConsumerStep2 = ({deal}:{deal:Deal}) => {
    const {t} = useTranslation(["dashboard", "payment"]);
  
  
    return (
      <div className="space-y-16 my-10">
          <div className="">
            <ol className="flex items-center w-full">
              <li className="relative flex w-full items-center text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-primary after:border-4 after:inline-block">
                  <span className="flex items-center justify-center w-10 h-10 bg-primary border border-primary rounded-full lg:h-12 lg:w-12 shrink-0">
                    <Check size={24} />
                  </span>
                  <span className="absolute -bottom-8 right-2 text-primary lg:text-xl">
                    {t("home.start-deal.consumer.step-1.name")}
                  </span>
              </li>
              <li className="relative flex w-full items-center text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-primary after:border-4 after:inline-block">
              <span className="flex items-center justify-center w-10 h-10 bg-primary border border-primary rounded-full lg:h-12 lg:w-12 shrink-0">
                    2
                  </span>
                  <span className="absolute -bottom-8 right-0 text-primary lg:text-xl">
                    {t("home.start-deal.consumer.step-2.name")}
                  </span>
              </li>
              <li className="relative flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-primary after:border-4 after:inline-block dark:after:border-gray-700">
                  <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 border border-primary shrink-0">
                    3
                  </span>
                  <span className="absolute -bottom-8 -right-4 text-primary tex lg:text-xll">
                    {t("home.start-deal.consumer.step-3.name")}
                  </span>
              </li>
              <li className="relative flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-primary after:border-4 after:inline-block dark:after:border-gray-700">
                  <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 border border-primary shrink-0">
                    4
                  </span>
                  <span className="absolute -bottom-8 right-0 text-primary lg:text-xl">
                    {t("home.start-deal.consumer.step-4.name")}
                  </span>
              </li>
              <li className="relative flex items-center">
                  <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 border border-primary shrink-0">
                    5
                  </span>
                  <span className="absolute -bottom-8 right-0 text-primary lg:text-xl">
                    {t("home.start-deal.consumer.step-5.name")}
                  </span>
              </li>
            </ol>
          </div>
          <div className="w-full rounded-md border border-primary flex justify-between items-center p-10">
              <p>
                {t("home.start-deal.consumer.step-2.hint")} 
              </p>
              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>{t("home.start-deal.consumer.step-2.confirm-btn")} </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] text-white bg-gradient-to-br from-primary to-blue-900 p-10 border-0">
                    <DialogHeader>
                      <DialogTitle className="text-center">{t("payment:chose-methods.title")}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 space-y-6">
                      <div>
                        <Button variant="secondary" className="w-full bg-white text-primary font-bold" asChild>
                          <Link href={`/dashboard/new-deal/${deal.id}/payment`}>
                            {t("payment:chose-methods.bank")}
                          </Link>
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 items-center gap-4">
                        <Image src="/post-office-method.jpeg" width={198} height={194} alt={t("payment:chose-methods.post")} />
                        <Image src="/baridi-mob.png" width={198} height={194} alt={t("payment:chose-methods.baridi-mob")} />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
          </div>
      </div>
    );
  };