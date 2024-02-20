"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/navigation";

const tradingFormSchema = z.object({
  role: z.optional(z.string()),
  domain: z.optional(z.string()),
  amount: z.optional(z.string()),
  currency: z.optional(z.string()),
});

const Trading = () => {
  const router = useRouter();
  const { t } = useTranslation(["shared", "common"]);
  const form = useForm<z.infer<typeof tradingFormSchema>>({
    resolver: zodResolver(tradingFormSchema),
    defaultValues: {
      role: "seller",
      amount: "600",
      currency: "dzd",
      domain: "apps",
    },
  });
  function onSubmit(values: z.infer<typeof tradingFormSchema>) {
    router.push(`dashboard/new-deal?role=${values.role}&domain=${values.domain}&amount=${values.amount}&currency=${values.currency}`);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="flex items-center space-x-2 rounded-md bg-white text-foreground">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className="w-[180px] border-none focus:ring-0">
                          <SelectValue placeholder={t("trading.seller")} />
                        </SelectTrigger>
                    </FormControl>
                        <SelectContent>
                          <SelectItem value="seller">
                            {t("trading.seller")}
                          </SelectItem>
                          <SelectItem value="buyer">
                            {t("trading.buyer")}
                          </SelectItem>
                          {/* <SelectItem value="">{t("trading.broker")}</SelectItem> */}
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator orientation="vertical" className="h-6" />
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="border-none focus:ring-0">
                            <SelectValue placeholder={t("trading.domain")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apps">
                            {t("common:domains.item-1")}
                          </SelectItem>
                          <SelectItem value="cars_trucks">
                            {t("common:domains.item-2")}
                          </SelectItem>
                          <SelectItem value="motor_sycles">
                            {t("common:domains.item-3")}
                          </SelectItem>
                          <SelectItem value="properties">
                            {t("common:domains.item-4")}
                          </SelectItem>
                          <SelectItem value="video_games">
                            {t("common:domains.item-5")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center rounded-md bg-white px-2 text-foreground">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <p>{t("trading.for")}</p>{" "}
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="300"
                          className="border-none placeholder:text-gray-600 focus:ring-0 focus-visible:ring-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                      <Select {...field}>
                    <FormControl>
                        <SelectTrigger className="border-none focus:ring-0">
                          <SelectValue placeholder={t("shared:trading.currency.dz")} />
                        </SelectTrigger>
                    </FormControl>
                        <SelectContent>
                          <SelectItem value="dzd">
                            {t("shared:trading.currency.dz")}
                          </SelectItem>
                          <SelectItem value="eur">
                            {t("shared:trading.currency.eu")}
                          </SelectItem>
                          <SelectItem value="gbp">
                            {t("shared:trading.currency.uk")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="">
            <Button type="submit" className="mt-8" size="lg">{t("action-button")}</Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Trading;
