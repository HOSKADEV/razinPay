"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";
import { useEdgeStore } from "@/providers/edgestore-provider";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CopyIdComponent from "./copy-id";

const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

const paymentFromSchema = z.object({
  party1Id: z
    .string()
    .min(2, {
      message: "Party1Id must be at least 2 characters.",
    })
    .max(14, {
      message: "Party1Id must be at most 14 characters.",
    }),
  party2Id: z
    .string()
    .min(2, {
      message: "Party2Id must be at least 2 characters.",
    })
    .max(14, {
      message: "Party2Id must be at most 14 characters.",
    }),
  image: z.string().url(),
});

const BankTransfer = () => {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);
  const { edgestore } = useEdgeStore();

  const { t } = useTranslation(["payment", "common"]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof paymentFromSchema>>({
    resolver: zodResolver(paymentFromSchema),
    defaultValues: {
      party1Id: "",
      party2Id: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof paymentFromSchema>) {
    console.log(values);
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async(e: React.DragEvent<HTMLDivElement>) => {
    setIsUploading(true);
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files?.length && files.length > 1) {
      console.log("Only one file is allowed");
      setIsUploading(false);
      return;
    }
    const file = files[0];
    if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        console.log("File:", file);
        const imageUrl = await uploadImage(file);
        form.setValue("image", imageUrl);
        setError(false);
    } else {
      console.log("Invalid file type:", file.type);
      setError(true);
    }
    setIsUploading(false);
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const files = e.target.files;

    if (files?.length && files.length > 1) {
      console.log("Only one file is allowed");
      setIsUploading(false);
      return;
    }
    if (files) {
      const file = files[0];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        console.log("File:", file);
        const imageUrl = await uploadImage(file);
        form.setValue("image", imageUrl);
        setError(false);
      } else {
        console.log("Invalid file type:", file.type);
        setError(true);
      }
    }
    setIsUploading(false);
  };

  const uploadImage = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });
    return response.url;
  };

  return (
    <div>
      <div className="my-16 space-y-4 text-center">
        <h2 className="text-lg font-semibold text-primary">
          {t("payment:bank.title")}
        </h2>
        <p>{t("payment:bank.description")}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="party2Id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("payment:bank.party-2-number")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} />{" "}
                    <CopyIdComponent
                      id={field.value}
                      className="absolute left-0 top-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="party1Id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("payment:bank.party-1-number")}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input {...field} />{" "}
                    <CopyIdComponent
                      id={field.value}
                      className="absolute left-0 top-0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("payment:bank.uploading-image")}</FormLabel>
                <FormControl>
                  <div>
                    <label className="grid place-items-center rounded-md border-2 border-dashed border-primary p-10 cursor-pointer">
                      {/* <div
                        className={` ${dragging ? "dragging" : ""} grid place-items-center rounded-md border-2 border-dashed border-primary p-10 cursor-pointer`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      > */}
                        <ImagePlus size={24} className="text-primary" />
                      {/* </div> */}
                      <Input
                        {...field}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange} 
                        className="hidden"
                      />
                    </label>
                    {selectedFile && !error && !isUploading && (
                      <div className="relative">
                        <Image
                          src={URL.createObjectURL(selectedFile)}
                          alt="Preview"
                          height={101}
                          width={162}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0"
                          onClick={() => setSelectedFile(null)}
                        >
                          <X />
                        </Button>
                      </div>
                    )}
                    {error && (
                      <Alert variant="destructive" className="my-4">
                        <div className="flex">
                          <ExclamationTriangleIcon className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                          <AlertTitle>{t("common:error.title")}</AlertTitle>
                        </div>
                        <AlertDescription>
                          {t("common:error.uploading-image")}
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" size="lg">{t("payment:bank.submit-btn")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BankTransfer;
