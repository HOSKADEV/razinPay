import { db } from "@/lib/db";

/**
 * Retrieves an account by user ID.
 * @param {string} userId - The unique identifier of the user.
 */
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({
      where: { userId },
    });

    return account;
  } catch {
    return null;
  }
};
