"use client";
import 'react-phone-number-input/style.css'
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import PhoneInput from 'react-phone-number-input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { profileFormSchema } from "@/schemas";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useCurrentUser } from "@/hooks/use-current-user";
import { updateProfile } from '@/actions/user';
import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export const ProfileForm = () => {
  const { t } = useTranslation(["dashboard","common"]);
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user?.firstName!,
      lastName: user?.lastName!,
      email: user?.email!,
      country:user?.country!,
      phone:user?.phone!,
      address:user?.address!,
      birthDay:user?.birthDay!
    },
  });

  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    startTransition(() => {
      updateProfile(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
            toast(t("profile.form.success-message"))
          }
        })
        .catch(() =>{ 
          toast(t("profile.form.error-message"))
        });
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="me-5">
                <FormControl>
                  <Input
                    className="placeholder:text-gray-600"
                    placeholder={t("profile.form.firstname-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <Input
                    className="placeholder:text-gray-600"
                    placeholder={t("profile.form.lastname-placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="">
              <FormControl>
                <Input
                  className="placeholder:text-gray-600"
                  placeholder={t("profile.form.email-placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <FormField
            control={form.control}
            name="birthDay"
            render={({ field }) => (
              <FormItem className="col-6 w-full flex flex-col text-black">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-1 text-start font-normal",
                          !field.value && "text-gray-600",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{t("profile.form.birthday-placeholder")}</span>
                        )}
                        <CalendarIcon className="end-1 ms-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value!}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PhoneInput
                        {...field}
                        className='rounded-md border border-input h-9 bg-transparent focus-visible:outline-none focus-visible:ring-1 focus:border-primary px-3'
                        defaultCountry="DZ"
                        placeholder={t("profile.form.phone-placeholder")}
                        />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("profile.form.country-placeholder")}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dz">
                        {t("common:country.algeria")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" {...field} placeholder={t("profile.form.address-placeholder")}
                  className="placeholder:text-gray-600"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-center items-center">
            <Button type="submit" size="lg">{t("profile.form.action-button")}</Button>
        </div>
      </form>
    </Form>
  );
};
