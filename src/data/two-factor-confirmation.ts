import { db } from "@/lib/db";

/**
 * Retrieves a two-factor confirmation record by user ID.
 * @param {string} userId - The unique identifier of the user.
 */
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId },
    });

    return twoFactorConfirmation;
  } catch {
    return null;
  }
};
