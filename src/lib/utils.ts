import { newItemSchema } from "@/schemas";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

/**
 * Combines multiple class names or class arrays into a single string.
 * @param {...ClassValue[]} inputs - Class names or arrays of class names.
 * @returns {string} - Combined class names as a string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Downloads CSV file using the provided form data and headers.
 * @param {object} formData - Form data to convert to CSV.
 * @param {string[]} headers - Array of header strings.
 */
export const downloadCSV = (formData: z.infer<typeof newItemSchema>, headers: string[]): void => {
  const csvData = convertToCSV(formData, headers);
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${formData.name.split(" ").join("_")}.csv`);
  document.body.appendChild(link);
  link.click();
};

/**
 * Converts data object into CSV format.
 * @param {object} data - Data object to be converted into CSV.
 * @param {string[]} headers - Array of header strings.
 * @returns {string} - CSV formatted string.
 */
export const convertToCSV = (data: { [key: string]: string|number }, headers: string[]): string => {
  const rows = [headers.join(",")];

  const rowData = headers.map((header) => data[header]);
  rows.push(rowData.join(","));

  return rows.join("\n");
};
