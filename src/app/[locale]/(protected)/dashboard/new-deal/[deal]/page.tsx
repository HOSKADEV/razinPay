import { getDealById } from "@/data/deal";
import Steps from "./steps";
import { notFound } from "next/navigation";

const Deal = async ({
  params,
}: {
  params: { locale: string; deal: string };
}) => {
  const deal = await getDealById(params.deal);
  if (!deal) {
    return notFound()
  }
  return <Steps deal={deal}/>;
};
export default Deal;
