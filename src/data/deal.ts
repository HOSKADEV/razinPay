import { db } from "@/lib/db";
import { Deal } from '@prisma/client';


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