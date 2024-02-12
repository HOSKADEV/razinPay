export type Deal = {
  id: number;
  title: string;
  date: string;
  price: number;
  status: "pending" | "processing" | "success" | "failed";
  role: "seller" | "consumer" | "broker";
};
