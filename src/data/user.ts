import { db } from "@/lib/db";

/**
 * Retrieves a user by their email address.
 * @param {string} email - The email address of the user.
 */
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

/**
 * Retrieves a user by their unique identifier.
 * @param {string} id - The unique identifier of the user.
 */
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

