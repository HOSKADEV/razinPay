import { getDealById } from "@/data/deal";
import Steps from "./steps";

const Deal = async ({
  params,
}: {
  params: { locale: string; deal: string };
}) => {
  const deal = await getDealById(params.deal);
  if (!deal) {
    return <div>Deal not found</div>;
  }
  return <Steps deal={deal}/>;
};
export default Deal;
