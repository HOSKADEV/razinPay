"use client"
import { useTranslation } from 'react-i18next'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Separator } from '@/components/ui/separator'
import { Card } from '@/components/ui/card'
 
export default  function Page({
    params: { locale },
}: {
    params: { locale: string };
}) {
    
    const { t } = useTranslation("profile");
  
  return (
    <main className='items-center justify-center  my-6 flex'>
        <Card className='p-8'>
            <h1 className='text-primary text-5xl mb-4'>{t('title')}</h1>
            <Separator />
            <div className='mt-4'>
                <InfoForm />
            </div>
        </Card>
    </main>
  )
}

const InfoForm = () =>{
    const { t } = useTranslation("profile");
    const formSchema = z.object({
        first_name: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
        last_name: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        email: z.string().email({
            message: "Username must be at least 2 characters.",
        }),
        birthday: z.date({
            required_error: "A date of birth is required.",
          }),
        phone: z.number().min(9,{
            message : "Username must be at least 9 digit.",
        }).max(9,{
            message : "Username must be at least 9 digit.",
        })
    })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

   
  const [date, setDate] = useState<Date>()
    return (
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-col flex placeholder:text-gray-600">
        <div className="flex-row flex mb-3">

        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem className="me-5">
              <FormControl>
                <Input className='placeholder:text-gray-600' placeholder={t('form.first_name')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
        control={form.control}
        name="last_name"
        render={({ field }) => (
          <FormItem className="">
            <FormControl>
              <Input className='placeholder:text-gray-600' placeholder={t('form.last_name')} {...field} />
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
                <Input className='placeholder:text-gray-600' placeholder={t('form.email')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex-row flex my-3">
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex flex-col col-6 text-black  me-5">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                    variant={'outline'}
                      className={cn(
                        "w-[240px] pl-3 text-start font-normal",
                        !field.value && "text-gray-600"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>إختر تاريخ الميلاد</span>
                      )}
                      <CalendarIcon className="ms-auto h-4 w-4 opacity-50 end-1" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
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
            <FormItem className="">
                <FormControl>
                <Input className='placeholder:text-gray-600' placeholder={t('form.phone')} {...field} />
                </FormControl>

                <FormMessage />
            </FormItem>
            )}
            />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    )
}