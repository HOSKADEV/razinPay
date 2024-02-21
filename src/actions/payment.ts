"use server";

import * as z from "zod";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { paymentFromSchema } from "@/components/bank-transfer-payment";

/**
 * Creates a new deal with the provided values.
 * 
 * @param values - The values for the new deal.
 */
export const createPayment = async (values: z.infer<typeof paymentFromSchema >& { dealId: string }) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const payment = await db.payment.create({
    data: {
        party1Id : values.party1Id,
        dealId: values.dealId,
        imageUrl: values.image,
        type:"BANK_TRANSFER",
    }
  });

  if (!payment) {
    return { error: "Failed to create deal" };
  }

  return { success: "Deal created successfully", id: payment.id};

};

  