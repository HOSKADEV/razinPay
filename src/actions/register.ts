"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

/**
 * Registers a new user with the provided values.
 * @param values - The values for registration.
 * @returns An object indicating the result of the registration.
 *          If successful, it returns { success: "Confirmation email sent!" }.
 *          If there are invalid fields, it returns { error: "Invalid fields!" }.
 *          If the email is already in use, it returns { error: "Email already in use!" }.
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newFistName = email.split("@")[0].split(".")
  const newLastName = email.split("@")[0].split(".")

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      firstName: newFistName[0].charAt(0).toUpperCase(),
      lastName : newLastName[0].charAt(0).toUpperCase(),
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
