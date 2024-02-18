"use server";

import * as z from "zod";

import { newItemSchema, confirmationSchema } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export const createDeal = async (values: z.infer<typeof newItemSchema & typeof confirmationSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  // console.log("values ===> ", { ...values, duration:Number.parseFloat(values.duration) , price:Number.parseFloat(values.price),party1Id: user.id  });

  // Create the deal in the database
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
      party2Email: values.party2Email,
      party2Phone: values.party2Phone,
    }
  });

  if (!deal) {
    return { error: "Failed to create deal" };
  }

  return { success: "Deal created successfully" };

};
