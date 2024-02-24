"use client"

import { ConsumerStep1 } from "./_steps/consumer/consumerStep1";
import { SellerStep1 } from "./_steps/seller/sellerStep1";

import type { Deal } from "@prisma/client";

import { dealStatus } from "@/config/constants";
import { ConsumerStep2 } from "./_steps/consumer/consumerStep2";
import { ConsumerStep3 } from "./_steps/consumer/consumerStep3";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SellerStep2 } from "./_steps/seller/sellerStep2";
import { SellerStep3 } from "./_steps/seller/sellerStep3";
import { SellerStep4 } from "./_steps/seller/sellerStep4";
import { ConsumerStep4 } from "./_steps/consumer/consumerStep4";
import { SellerStep5 } from "./_steps/seller/sellerStep5";
import { ConsumerStep5 } from "./_steps/consumer/consumerStep5";
import { ClosedStep } from "./_steps/closed-step";
import { AdminApproval } from "./_steps/admin-approval-step";

const Steps = ({deal}:{deal:Deal}) => {
  const user = useCurrentUser()
  if ((deal.party1Id == user?.id && deal.role == "buyer") ||  (deal.party2Email == user?.email && deal.role == "seller")) {
    if(deal.status == dealStatus.AGREEMENT){
      return <ConsumerStep1 deal={deal} user={user}/>
    }else if (deal.status == dealStatus.PAYMENT_PENDING) {
      return <ConsumerStep2 deal={deal}/>
    }else if (deal.status == dealStatus.ADMIN_APPROVAL) {
      return <AdminApproval/>
    }else if (deal.status == dealStatus.SHIPMENT_PENDING) {
      return <ConsumerStep3/>
    }else if(deal.status == dealStatus.HAS_BEEN_SHIPPED){
      return <ConsumerStep4 deal={deal}/>
    }else if(deal.status == dealStatus.ITEM_VALID){
      return <ConsumerStep5 deal={deal}/>
    }else if(deal.status == dealStatus.CLOSED){
      return <ClosedStep/>
    }
  }else if((deal.party1Id == user?.id && deal.role == "seller") || (deal.party2Email == user?.email && deal.role == "buyer")){
    if(deal.status == dealStatus.AGREEMENT){
      return <SellerStep1 deal={deal} user={user}/>
    }else if (deal.status == dealStatus.PAYMENT_PENDING) {
      return <SellerStep2 deal={deal}/>
    }else if (deal.status == dealStatus.ADMIN_APPROVAL) {
      return <AdminApproval/>
    }else if (deal.status == dealStatus.SHIPMENT_PENDING) {
      return <SellerStep3 deal={deal}/>
    }else if (deal.status == dealStatus.HAS_BEEN_SHIPPED) {
      return <SellerStep4 deal={deal}/>
    }else if(deal.status == dealStatus.ITEM_VALID){
      return <SellerStep5 deal={deal}/>
    }else if(deal.status == dealStatus.CLOSED){
      return <ClosedStep/>
    }
  }


  return (
    <>
      
    </>
  );
};

export default Steps;
