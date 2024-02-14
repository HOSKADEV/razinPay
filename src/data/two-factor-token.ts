import { db } from "@/lib/db";

/**
 * Retrieves a two-factor authentication token by its token.
 * @param {string} token - The token of the two-factor authentication token.
 */
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};

/**
 * Retrieves a two-factor authentication token by email.
 * @param {string} email - The email associated with the two-factor authentication token.
 */
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    return twoFactorToken;
  } catch {
    return null;
  }
};
