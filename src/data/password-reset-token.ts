import { db } from "@/lib/db";

/**
 * Retrieves a password reset token by its token.
 * @param {string} token - The token of the password reset token.
 */
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

/**
 * Retrieves a password reset token by email.
 * @param {string} email - The email associated with the password reset token.
 */
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

