import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

/**
 * Generates a two-factor authentication token for the specified email address.
 * @param {string} email - The email address for which to generate the token.
 * @returns {Promise<any>} - A promise that resolves with the generated token.
 */
export const generateTwoFactorToken = async (email: string): Promise<any> => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);

  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return twoFactorToken;
};

/**
 * Generates a password reset token for the specified email address.
 * @param {string} email - The email address for which to generate the token.
 * @returns {Promise<any>} - A promise that resolves with the generated token.
 */
export const generatePasswordResetToken = async (email: string): Promise<any> => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

/**
 * Generates a verification token for the specified email address.
 * @param {string} email - The email address for which to generate the token.
 * @returns {Promise<any>} - A promise that resolves with the generated token.
 */
export const generateVerificationToken = async (email: string): Promise<any> => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};
