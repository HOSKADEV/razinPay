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

/**
 * Retrieves deals based on the provided user ID and email.
 * @param userID - The ID of the user.
 * @param userEmail - The email of the user.
 * @returns A promise that resolves to an array of deals.
 */
export async function getDeals(userID:string, userEmail?:string) {
  const deals = await db.deal.findMany({
    where: {
      OR: [
        { party1Id: userID },
        { party2Email: userEmail },
      ],
    },
  });
  db.$disconnect();
  return deals;
}