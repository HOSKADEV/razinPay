"use server";

import * as z from "zod";

import { newItemSchema, confirmationSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { dealStatus } from "@/config/constants";

/**
 * Creates a new deal with the provided values.
 * 
 * @param values - The values for the new deal.
 */
export const createDeal = async (values: z.infer<typeof newItemSchema & typeof confirmationSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const deal = await db.deal.create({
    data: {
      duration: Number.parseFloat(values.duration),
      price: Number.parseFloat(values.price),
      party1Id: user.id,
      name: values.name,
      role: values.role,
      currency: values.currency,
      itemName: values.itemName,
      domain: values.domain,
      description: values.description,
      status:"AGREEMENT",
      party2Email: values.party2Email,
      party2Phone: values.party2Phone,
    }
  });

  if (!deal) {
    return { error: "Failed to create deal" };
  }

  return { success: "Deal created successfully", id: deal.id};

};

/**
 * Updates the status of a deal.
 * @param dealId - The ID of the deal to update.
 * @param newStatus - The new status to set for the deal.
 */
export const updateDealStatus = async ({dealId, newStatus}:{dealId:string, newStatus:string}) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const deal = await db.deal.update({
    where: {id: dealId},
    data: {
      status: newStatus,
    }
  });

  if (!deal) {
    return { error: "Failed to update deal status" };
  }

  return { success: "Deal status updated successfully", id: deal.id};

};


/**
 * Updates the payment ID of a deal.
 * @param dealId - The ID of the deal.
 * @param paymentId - The ID of the payment.
 * @returns An object indicating the result of the update operation.
 *          If the update is successful, it contains the success message and the ID of the updated deal.
 *          If the update fails due to unauthorized access or other errors, it contains the error message.
 */
export const updateDealPayment = async ({dealId, paymentId}:{dealId:string, paymentId:string}) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const deal = await db.deal.update({
    where: {id: dealId},
    data: {
      paymentId: paymentId,
      status:  dealStatus.ADMIN_APPROVAL,
    }
  });

  if (!deal) {
    return { error: "Failed to update deal status" };
  }

  return { success: "Deal status updated successfully", id: deal.id};

};