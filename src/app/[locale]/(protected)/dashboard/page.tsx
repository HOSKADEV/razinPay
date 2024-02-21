import initTranslations from "@/app/i18n";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Deal } from "@/types";
import { columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { getDeals } from "@/data/deal";
import { notFound } from "next/navigation";
const i18nNamespaces = ["dashboard"];
export const payments: Deal[] = [
  {
    id: 123456789,
    title: "selling car",
    status: "pending",
    price: 123.54,
    date: new Date().toLocaleDateString(),
    role: "seller",
  },
  {
    id: 987654321,
    title: "bla bla",
    price: 131.54,
    status: "pending",
    date: new Date().toLocaleDateString(),
    role: "seller",
  },
  // ...
];
const UserDashboardPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const user = await currentUser();
  if(!user) return notFound();
  const data = await getData(user.id, user?.email!);
  return (
    <div className="px-3 py-8 md:container">
      <div className="flex items-center justify-between py-8">
        <h2 className="text-xl font-bold text-primary">{t("home.heading")}</h2>
        <Button variant="secondary" asChild>
          <Link href="/dashboard/new-deal">{t("home.new-deal-btn")}</Link>
        </Button>
      </div>
      <Separator className="my-8" />
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default UserDashboardPage;

async function getData(userID:string, userEmail?:string) {
  const deals = await getDeals(userID, userEmail);
  return deals;
}
