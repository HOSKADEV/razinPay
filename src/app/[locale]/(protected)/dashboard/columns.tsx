"use client";

import { Button } from "@/components/ui/button";
import { Deal } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export const columns: ColumnDef<Deal>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      const { t } = useTranslation("dashboard");
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("home.table-header.id")}
          <ArrowUpDown className="h-4 w-4 ltr:ml-2 rtl:mr-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: () => {
      const { t } = useTranslation("dashboard");
      return <span>{t("home.table-header.title")}</span>;
    },
  },
  {
    accessorKey: "date",
    header: () => {
      const { t } = useTranslation("dashboard");
      return <span>{t("home.table-header.date")}</span>;
    },
  },
  {
    accessorKey: "price",
    header: () => {
      const { t } = useTranslation("dashboard");
      return <span>{t("home.table-header.price")}</span>;
    },
  },
  {
    accessorKey: "role",
    header: () => {
      const { t } = useTranslation("dashboard");
      return <>{t("home.table-header.role")}</>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      const { t } = useTranslation("dashboard");
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          {t("home.table-header.status")}
          <ArrowUpDown className="h-4 w-4 ltr:ml-2 rtl:mr-2" />
        </Button>
      );
    },
  },
];
