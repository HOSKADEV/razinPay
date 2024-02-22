"use client";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { downloadCSV } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { createDeal } from "@/actions/deal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";

const NewItemForm = () => {
  const user = useCurrentUser();
  const feesPercentage = 0.1;
  const router = useRouter();
  const { t } = useTranslation(["dashboard", "common"]);
  const [showDealSummary, setShowDealSummary] = useState(false);
  const [formValues, setFormValues] = useState(
    {} as z.infer<typeof newItemSchema>,
  );
  const [pricing, setPricing] = useState({
    price:10.00,
    buyerPrice: 0.00,
    sellerRevenue: 0.00,
    razinRevenue: 0.00,
    feesType: "Buyer",
  });
  const [isPending, startTransition] = useTransition();
  const params = useSearchParams();
  const searchParams = new URLSearchParams(params);
  const newItemSchema = z.object({
    name: z.string({
      required_error: t("common:form-messages.required"),
    }).min(2, {
      message:t("common:form-messages.deal-title-min-length"), 
    }),
    role: z.string({
      required_error: t("common:form-messages.required"),
    }),
    currency: z.string({
      required_error: t("common:form-messages.required"),
    }),
    duration: z.preprocess((value) => parseInt(z.string().parse(value),10),
    z.number().gte(1, t("common:form-messages.duration-min")).lte(30, t("common:form-messages.duration-max"))),
    itemName: z
      .string({
        required_error: t("common:form-messages.required"),
      })
      .min(3, {
        message: t("common:form-messages.minlength"), 
      }),
    price: z.preprocess((value) => parseInt(z.string().parse(value),10),
    z.number().gte(10, t("common:form-messages.price-min"))),
    domain: z.string({
      required_error: t("common:form-messages.required"),
    }),
    description: z
      .string({
        required_error:t("common:form-messages.required")
      })
      .min(3, {
        message: t("common:form-messages.min"),
      })
      .max(300, {
        message: t("common:form-messages.max"),
      }),
  });
  const formMethods = useForm<z.infer<typeof newItemSchema>>({
    resolver: zodResolver(newItemSchema),
    defaultValues: {
      name: "",
      role: searchParams.get("role") || "",
      currency: searchParams.get("currency") || "",
      duration: 1,
      itemName: "",
      domain: searchParams.get("domain") || "",
      price: Number(searchParams.get("amount")) || 10,
      description: "",
    },
  });
  

  
  const confirmationSchema = z.object({
    party2Email: z.string()
      .email({
        message: t("common:form-messages.required")
      })
      .refine((value) => {
        if (value === user?.email) {
          return false;
        }
        return true;
      }, {
        message: t("common:form-messages.you-cant-use-your-email"),
      }),
    party2Phone: z.string().min(1, {
      message: t("common:form-messages.required"),
    }),
  });
  const confirmationForm = useForm<z.infer<typeof confirmationSchema>>({
    resolver: zodResolver(confirmationSchema),
    defaultValues: {
      party2Email: "",
      party2Phone: "",
    },
  });

  const headers = ["name", "role", "currency", "duration", "itemName", "price"];

  function onSubmit(formData: z.infer<typeof newItemSchema>) {
    setShowDealSummary(true);
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
      </pre>,
    );
    setPricing({
      price: formData.price,
      buyerPrice: Number(formData.price) + (Number(formData.price) * feesPercentage) / 2,
      sellerRevenue: Number(formData.price) - (Number(formData.price) * feesPercentage) / 2,
      razinRevenue: (Number(formData.price) * feesPercentage) / 2,
      feesType: "Buyer",
    });
    setFormValues(formData);
  }

  function onSecondarySubmit(
    secondaryFormData: z.infer<typeof confirmationSchema>,
  ) {
    startTransition(() => {
      createDeal({ ...formValues, ...secondaryFormData, buyerPrice:pricing.buyerPrice,
        sellerRevenue: pricing.sellerRevenue,
        razinRevenue: pricing.razinRevenue,
        feesType: pricing.feesType
      })
        .then((data) => {
          if (data.error) {
            toast.error(t("home.new-deal.deal-summary.error-message"), {
              icon: "🚨",
            });
          }

          if (data.success) {
            toast.success(t("home.new-deal.deal-summary.success-message"), {
              icon: "🎉",
            });
          }
          router.push(`/dashboard/new-deal/${data.id}`);
        })
        .catch(() =>
          toast.error(t("home.new-deal.deal-summary.error-message"), {
            icon: "🚨",
          }),
        );
    });
  }
  return (
    <div className="space-y-6">
      <Form {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={formMethods.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("home.new-deal.deal-title-placeholder")}
                    className="placeholder:text-gray-500"
                    disabled={showDealSummary || isPending}
                    aria-disabled={showDealSummary || isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <FormField
              control={formMethods.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("home.new-deal.role-label")}</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    disabled={showDealSummary || isPending}
                    aria-disabled={showDealSummary || isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("home.new-deal.role-label")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="buyer">
                        {t("home.new-deal.role-options.item-1")}
                      </SelectItem>
                      <SelectItem value="seller">
                        {t("home.new-deal.role-options.item-2")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formMethods.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("home.new-deal.currency-label")}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={showDealSummary || isPending}
                    aria-disabled={showDealSummary || isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("home.new-deal.currency-label")}
                        />
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
            <FormField
              control={formMethods.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("home.new-deal.examination-label")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("1")}
                      className="placeholder:text-gray-500"
                      disabled={showDealSummary || isPending}
                      aria-disabled={showDealSummary || isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold">
              {t("home.new-deal.deal-details.title")}
            </h3>
            <div className="grid grid-cols-2 items-end gap-6">
              <FormField
                control={formMethods.control}
                name="itemName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t(
                          "home.new-deal.deal-details.item-name-placeholder",
                        )}
                        className="placeholder:text-gray-500"
                        disabled={showDealSummary || isPending}
                        aria-disabled={showDealSummary || isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formMethods.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("home.new-deal.deal-details.price-label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t(
                          "home.new-deal.deal-details.price-label",
                        )}
                        className="placeholder:text-gray-500"
                        disabled={showDealSummary || isPending}
                        aria-disabled={showDealSummary || isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={formMethods.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={showDealSummary || isPending}
                    aria-disabled={showDealSummary || isPending}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("common:domains.title")} />
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
            <FormField
              control={formMethods.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={t(
                        "home.new-deal.deal-details.details-placeholder",
                      )}
                      className="resize-none placeholder:text-gray-500"
                      rows={5}
                      disabled={showDealSummary || isPending}
                      aria-disabled={showDealSummary || isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                downloadCSV(formMethods.getValues(), headers);
              }}
            >
              {t("home.new-deal.download-as-csv")}
            </Button>
            <Button
              type="submit"
              disabled={showDealSummary || isPending}
              aria-disabled={showDealSummary || isPending}
            >
              {t("home.new-deal.add-item")}
            </Button>
          </div>
        </form>
      </Form>
      {showDealSummary && (
        <Form {...confirmationForm}>
          <form
            onSubmit={confirmationForm.handleSubmit(onSecondarySubmit)}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold">
                {t("home.new-deal.deal-summary.heading")}
              </h3>
              <div className="space-y-2">
                <p className="flex items-center justify-between">
                  <span>{t("home.new-deal.deal-summary.sub-total")}</span>
                  <span>
                    {pricing.price.toString() +
                      " " +
                      t(`common:currency.${formValues.currency}`)}
                  </span>
                </p>
                <p className="flex items-center justify-between text-primary">
                  <span>{t("home.new-deal.deal-summary.razin-fees")}</span>
                  <span>
                    {pricing.razinRevenue +
                      " " +
                      t(`common:currency.${formValues.currency}`)}
                  </span>
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="flex items-center justify-between">
                  <span>{t("home.new-deal.deal-summary.customer-price")}</span>
                  <span>
                    {pricing.buyerPrice.toString() +
                      " " +
                      t(`common:currency.${formValues.currency}`)}
                  </span>
                </p>
                <p className="flex items-center justify-between text-primary">
                  <span>{t("home.new-deal.deal-summary.seller-revenue")}</span>
                  <span>
                    {pricing.sellerRevenue.toString() +
                      " " +
                      t(`common:currency.${formValues.currency}`)}
                  </span>
                </p>
              </div>
              <p className="text-center font-semibold">
                {t("home.new-deal.deal-summary.hint")}
              </p>
              <h3 className="text-xl font-bold">
                {t("home.new-deal.deal-summary.other-dealer-details") +
                  " " +
                  t(
                    `home.new-deal.deal-summary.${formValues.role === "consumer" ? "seller" : "customer"}`,
                  )}
              </h3>
              <div className="space-y-8">
                <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2">
                  <FormField
                    control={confirmationForm.control}
                    name="party2Email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={t(
                              "home.new-deal.deal-summary.email-placeholder",
                            )}
                            className="placeholder:text-gray-500"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={confirmationForm.control}
                    name="party2Phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <PhoneInput
                            {...field}
                            className="h-9 rounded-md border border-input bg-transparent px-3 focus:border-primary focus-visible:outline-none focus-visible:ring-1"
                            defaultCountry="DZ"
                            placeholder={t(
                              "home.new-deal.deal-summary.phone-placeholder",
                            )}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-center gap-4">
                  <Button type="submit" size="lg">
                    {t("home.new-deal.deal-summary.start-deal")}
                  </Button>
                </div>
              </div>
              <div className="text-center">
                <p>
                  {t("home.new-deal.deal-summary.terms-privacy.text1")}
                  <br />
                  <Link
                    href="/terms"
                    className="text-secondary underline underline-offset-2"
                  >
                    {t("home.new-deal.deal-summary.terms-privacy.link1")}
                  </Link>
                  <br />
                  {t("home.new-deal.deal-summary.terms-privacy.text2") + " "}
                  <Link
                    href="/privacy"
                    className="text-secondary underline underline-offset-2"
                  >
                    {t("home.new-deal.deal-summary.terms-privacy.link2")}
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default NewItemForm;
