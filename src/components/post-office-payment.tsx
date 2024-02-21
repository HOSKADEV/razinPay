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
const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

const paymentFromSchema = z.object({
  image: z.string().url(),
});

const PostOfficePayment = () => {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);
  const { edgestore } = useEdgeStore();
  const { t } = useTranslation(["payment", "common"]);

  const form = useForm<z.infer<typeof paymentFromSchema>>({
    resolver: zodResolver(paymentFromSchema),
  });

  function onSubmit(values: z.infer<typeof paymentFromSchema>) {
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
      setIsUploading(false);
      return;
    }
    const file = files[0];
    if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        const imageUrl = await uploadImage(file);
        form.setValue("image", imageUrl);
        setError(false);
    } else {
      setError(true);
    }
    setIsUploading(false);
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const files = e.target.files;

    if (files?.length && files.length > 1) {
      setIsUploading(false);
      return;
    }
    if (files) {
      const file = files[0];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        const imageUrl = await uploadImage(file);
        form.setValue("image", imageUrl);
        setError(false);
      } else {
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
          {t("payment:post.title")}
        </h2>
        <p>{t("payment:post.description")}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="border-2 border-primary rounded-md">
                <Image src="/post-office.svg" alt="the image is not available, call us for more information" width={760} height={610} className="w-full h-[310]" />
                <figcaption className="w-full py-4 text-white bg-primary">{t("payment:post.methode-image-caption")}</figcaption>
            </div>
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel>{t("payment:post.uploading-image")}</FormLabel>
                <FormControl>
                  <div>
                    <label>
                      <div
                        className={` ${dragging ? "dragging" : ""} grid place-items-center rounded-md border-2 border-dashed border-primary p-10 cursor-pointer`}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        <ImagePlus size={24} className="text-primary" />
                      </div>
                      <Input
                      {...rest}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="sr-only"
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
            <Button type="submit" size="lg" disabled={isUploading}>{t("payment:post.submit-btn")}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PostOfficePayment;
