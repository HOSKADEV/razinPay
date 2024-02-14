"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useState } from "react";
import { newItemSchema } from "@/schemas";
import { downloadCSV } from "@/lib/utils";


const NewItemForm = () => {
  const { t } = useTranslation(["dashboard", "common"]);
  const [selectedRole, setSelectedRole] = useState("");
  const form = useForm<z.infer<typeof newItemSchema>>({
    resolver: zodResolver(newItemSchema),
    defaultValues: {
      title: "",
      role: "",
      currency: "",
      duration: "1",
      itemName: "",
      domain: "",
      price: "1",
      brokerPrice: "1",
      details: "",
    },
  });
  const headers = [
    "title",
    "role",
    "currency",
    "duration",
    "itemName",
    "price",
  ];

  
  function onSubmit(formData: z.infer<typeof newItemSchema>) {
    toast(
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">{JSON.stringify(formData, null, 2)}</code>
      </pre>,
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={t("home.new-deal.deal-title-placeholder")}
                  {...field}
                  className="placeholder:text-gray-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("home.new-deal.role-label")}</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedRole(value);
                  }}
                  defaultValue={field.value}
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
                    <SelectItem value="broker">
                      {t("home.new-deal.role-options.item-3")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("home.new-deal.currency-label")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("home.new-deal.examination-label")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("1")}
                    type="number"
                    {...field}
                    className="placeholder:text-gray-500"
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
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder={t(
                        "home.new-deal.deal-details.item-name-placeholder",
                      )}
                      {...field}
                      className="placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("home.new-deal.deal-details.price-label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("home.new-deal.deal-details.price-label")}
                      {...field}
                      className="placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="domain"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
          {selectedRole === "broker" && (
            <FormField
              control={form.control}
              name="brokerPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("home.new-deal.deal-details.broker-price-label")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00DA"
                      {...field}
                      className="placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={t(
                      "home.new-deal.deal-details.details-placeholder",
                    )}
                    className="resize-none placeholder:text-gray-500"
                    rows={5}
                    {...field}
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
              downloadCSV(form.getValues(),headers);
            }}
          >
            {t("home.new-deal.download-as-csv")}
          </Button>
          <Button type="submit">{t("home.new-deal.add-item")}</Button>
        </div>
      </form>
    </Form>
  );
};

export default NewItemForm;
