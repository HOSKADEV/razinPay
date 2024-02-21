"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Deal } from "@prisma/client";
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
    accessorKey: "name",
    header: () => {
      const { t } = useTranslation("dashboard");
      return <span className="whitespace-nowrap">{t("home.table-header.title")}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => {
      const { t } = useTranslation("dashboard");
      return <span className="whitespace-nowrap">{t("home.table-header.date")}</span>;
    },
    cell: ({ row }) => {
      return <time dateTime={row.original.createdAt.toDateString()} className="whitespace-nowrap">{row.original.createdAt.toDateString()}</time>;
    }
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
      return <span>{t("home.table-header.role")}</span>;
    },
    cell: ({ row }) => {
      const { t } = useTranslation("dashboard");
      const user = useCurrentUser()
      if(user?.email === row.original.party2Email && row.original.role === "seller") {
        return <span className="whitespace-nowrap">{t("home.table-header.buyer")}</span>;
      }else if(user?.email === row.original.party2Email && row.original.role === "buyer") {
        return <span className="whitespace-nowrap">{t("home.table-header.seller")}</span>;
      }else if(user?.id === row.original.party1Id && row.original.role === "buyer") {
        return <span className="whitespace-nowrap">{t("home.table-header.buyer")}</span>;
      }else if(user?.id === row.original.party1Id && row.original.role === "seller") {
        return <span className="whitespace-nowrap">{t("home.table-header.seller")}</span>;
      }
    }
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
    cell: ({ row }) => {
      const { t } = useTranslation("common");
      return <span className="whitespace-nowrap">{t(`deal-status.${row.original.status}`)}</span>;
    }
  },
];
