import { db } from "@/lib/db";
import { Deal } from '@prisma/client';

/**
 * Create a new deal.
 * @param dealData - The data for the new deal.
 */
export async function createDeal(dealData: Deal) {
  const createdDeal = await db.deal.create({ data: dealData });
  db.$disconnect();
  return createdDeal;
}

/**
 * Get a deal by its ID.
 * @param dealId - The ID of the deal.
 */
export async function getDealById(dealId: string) {
  const deal = await db.deal.findUnique({ where: { id: dealId } });
  db.$disconnect();
  return deal;
}

/**
 * Delete a deal by its ID.
 * @param dealId - The ID of the deal to delete.
 */
export async function deleteDeal(dealId: string) {
  const deletedDeal = await db.deal.delete({ where: { id: dealId } });
  db.$disconnect();
  return deletedDeal;
}