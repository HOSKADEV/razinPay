import initTranslations from "@/app/i18n";
import OfferCard from "@/components/shared/offer-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Tutorial from "../_components/tutorial";
import { Separator } from "@/components/ui/separator";
const i18nNamespaces = ["calculate-fees"];
const invoices = [
  {
    invoice: "INV001",
    totalAmount: "$250.00",
  },
  {
    invoice: "INV002",
    totalAmount: "$150.00",
  },
  {
    invoice: "INV003",
    totalAmount: "$350.00",
  },
  {
    invoice: "INV004",
    totalAmount: "$450.00",
  },
  {
    invoice: "INV005",
    totalAmount: "$550.00",
  },
  {
    invoice: "INV006",
    totalAmount: "$200.00",
  },
  {
    invoice: "INV007",
    totalAmount: "$300.00",
  },
];
const CalculateFeesPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const { t } = await initTranslations(locale, i18nNamespaces);

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-primary">{t("title")}</h3>
        <time dateTime="2023-11-06" className="text-gray-800">
          {t("updated")}
        </time>
        <Separator />
        <p className="font-semibold">{t("desc")}</p>
      </div>
      <div className="space-y-8 leading-8">
        <Table className="border border-border">
          <TableHeader>
            <TableRow className="divide-x bg-muted-foreground">
              <TableHead className="text-gray-500">
                {t("table.head-1")}
              </TableHead>
              <TableHead className="text-gray-500">
                {t("table.head-2")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice} className="divide-x">
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell className="">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Tutorial />
        <div className="space-y-6">
          <h3 className="font-semibold">{t("features.title")}</h3>
          <ul className="list-disc space-y-4">
            <li className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="h-4 w-4 rounded-full bg-secondary" />
              <p>{t("features.item-1")}</p>
            </li>
            <li className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="h-4 w-4 rounded-full bg-secondary" />
              <p>{t("features.item-2")}</p>
            </li>
            <li className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="h-4 w-4 rounded-full bg-secondary" />
              <p>{t("features.item-3")}</p>
            </li>
            <li className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="h-4 w-4 rounded-full bg-secondary" />
              <p>{t("features.item-4")}</p>
            </li>
            <li className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="h-4 w-4 rounded-full bg-secondary" />
              <p>{t("features.item-5")}</p>
            </li>
            <li className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="h-4 w-4 rounded-full bg-secondary" />
              <p>{t("features.item-6")}</p>
            </li>
          </ul>
        </div>
        <OfferCard locale={locale} />
      </div>
    </>
  );
};

export default CalculateFeesPage;
