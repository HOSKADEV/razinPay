"use client";

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

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
import { confirmationSchema, newItemSchema } from "@/schemas";
import { downloadCSV } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { createDeal } from '@/actions/deal';

const NewItemForm = () => {
  const feesPercentage = 0.1;
  const { t } = useTranslation(["dashboard", "common"]);
  const [showDealSummary, setShowDealSummary] = useState(false);
  const [formValues, setFormValues] = useState(
    {} as z.infer<typeof newItemSchema>,
  );
  const [subPrice, setSubPrice] = useState(0);
  const [isPending, startTransition] = useTransition();

  const formMethods = useForm<z.infer<typeof newItemSchema>>({
    resolver: zodResolver(newItemSchema),
    defaultValues: {
      name: "",
      role: "",
      currency: "",
      duration: "1",
      itemName: "",
      domain: "",
      price: "1",
      description: "",
    },
  });

  const confirmationForm = useForm<z.infer<typeof confirmationSchema>>({
    resolver: zodResolver(confirmationSchema),
    defaultValues: {
      party2Email: "",
      party2Phone: "",
    },
  });

  const headers = [
    "name",
    "role",
    "currency",
    "duration",
    "itemName",
    "price",
  ];

  function onSubmit(formData: z.infer<typeof newItemSchema>) {
    setShowDealSummary(true);
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
      </pre>,
    );
    setSubPrice(Number(formData.price));
    setFormValues(formData);
  }

  function onSecondarySubmit(
    secondaryFormData: z.infer<typeof confirmationSchema>,
  ) {
    startTransition(() => {
      createDeal({...formValues, ...secondaryFormData})
        .then((data) => {
          if (data.error) {
            toast.error(t("home.new-deal.deal-summary.error-message"),{icon:'🚨'})
          }

          if (data.success) {
            toast.success(t("home.new-deal.deal-summary.success-message"),{icon:'🎉'});
          }
        })
        .catch(() => toast.error(t("home.new-deal.deal-summary.error-message"),{icon:'🚨'}));
    });
    console.log({ ...formValues, ...secondaryFormData });
  }
  return (
    <div className="space-y-6">
      <Form {...formMethods} >
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
                    disabled={showDealSummary}
                    aria-disabled={showDealSummary}
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
                    disabled={showDealSummary}
                    aria-disabled={showDealSummary}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("home.new-deal.role-label")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="consumer">
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
                    disabled={showDealSummary}
                    aria-disabled={showDealSummary}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("home.new-deal.currency-label")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dz">
                        {t("home.new-deal.currency-options.dz")}
                      </SelectItem>
                      <SelectItem value="eu">
                        {t("home.new-deal.currency-options.eu")}
                      </SelectItem>
                      <SelectItem value="uk">
                        {t("home.new-deal.currency-options.uk")}
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
                      type="number"
                      className="placeholder:text-gray-500"
                    disabled={showDealSummary}
                    aria-disabled={showDealSummary}
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
                    disabled={showDealSummary}
                    aria-disabled={showDealSummary}
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
                        type="number"
                        placeholder={t(
                          "home.new-deal.deal-details.price-label",
                        )}
                        className="placeholder:text-gray-500"
                        disabled={showDealSummary}
                        aria-disabled={showDealSummary}
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
                    disabled={showDealSummary}
                    aria-disabled={showDealSummary}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("common:domains.title")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="consumer">
                        {t("common:domains.item-1")}
                      </SelectItem>
                      <SelectItem value="seller">
                        {t("common:domains.item-2")}
                      </SelectItem>
                      <SelectItem value="broker">
                        {t("common:domains.item-3")}
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
                      disabled={showDealSummary}
                      aria-disabled={showDealSummary}
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
            <Button type="submit" disabled={showDealSummary}
            aria-disabled={showDealSummary}>
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
                  <span>{subPrice.toString()+ " "+t(`common:currency.${formValues.currency}`)}</span>
                </p>
                <p className="flex items-center justify-between text-primary">
                  <span>{t("home.new-deal.deal-summary.razin-fees")}</span>
                  <span>{(subPrice * feesPercentage).toString()+ " "+t(`common:currency.${formValues.currency}`)}</span>
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="flex items-center justify-between">
                  <span>{t("home.new-deal.deal-summary.customer-price")}</span>
                  <span>{(subPrice + (subPrice * feesPercentage)/2).toString()+ " "+t(`common:currency.${formValues.currency}`)}</span>
                </p>
                <p className="flex items-center justify-between text-primary">
                  <span>{t("home.new-deal.deal-summary.seller-revenue")}</span>
                  <span>{(subPrice - subPrice * feesPercentage/2).toString() + " "+t(`common:currency.${formValues.currency}`)}</span>
                </p>
              </div>
              <p className="text-center font-semibold">
                {t("home.new-deal.deal-summary.hint")}
              </p>
              <h3 className="text-xl font-bold">
                {t("home.new-deal.deal-summary.other-dealer-details") +" "+ t(`home.new-deal.deal-summary.${formValues.role==='consumer'?'seller':'customer'}`)} 
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
                            type="email"
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
                            className='rounded-md border border-input h-9 bg-transparent focus-visible:outline-none focus-visible:ring-1 focus:border-primary px-3'
                            defaultCountry="DZ"
                            placeholder={t("home.new-deal.deal-summary.phone-placeholder")}
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
