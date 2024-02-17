import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    firstName: z.optional(z.string()),
    lastName: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
);

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().refine(
    (value) => {
      if (value.length < 8) {
        return false;
      }

      if (!/[A-Z]/.test(value)) {
        return false;
      }

      if (!/[a-z]/.test(value)) {
        return false;
      }

      if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)) {
        return false;
      }

      return true;
    },
    {
      message:
        "Password must be at least 8 characters long. \ncontain at least one uppercase letter, one lowercase letter. \none special character",
    },
  ),
});

export const newItemSchema = z.object({
  title: z.string().min(2, {
    message: "dealTitle must be at least 2 characters.",
  }),
  role: z.string({
    required_error: "Please select an role to display.",
  }),
  currency: z.string({
    required_error: "Please select an currency to display.",
  }),
  duration: z
    .string({
      required_error: "enter the the duration pls.",
    })
    .min(1, {
      message: "durarion must be at least 1 days.",
    }),
  itemName: z
    .string({
      required_error: "item name is required.",
    })
    .min(2, {
      message: "item name must be at least 2 characters.",
    }),
  price: z
    .string({
      required_error: "Price is required.",
    })
    .min(2, {
      message: "Price must be at least 2 characters.",
    }),
  domain: z.string({
    required_error: "Please select an domain to display.",
  }),
  details: z
    .string()
    .min(10, {
      message: "Details must be at least 10 characters.",
    })
    .max(300, {
      message: "Details must not be longer than 300 characters.",
    }),
    consumerEmail: z.string().email({
      message: "Email is required",
    }),
    consumerPhone: z.string().min(1, {
      message: "Phone number is required",
    }),
});

export const confirmationSchema = z.object({
});

export const profileFormSchema = z.object({
  firstName: z.optional(z.string().min(2).max(50)),
  lastName: z.optional(z.string().min(2).max(50)),
  email: z.optional(z.string().email()),
  birthDay: z.optional(z.date()),
  phone: z.optional(z.string().refine((value) => {
    const phoneRegex = /^(?:\+213|0)(?:(?:5|6|7)\d{8}|[4-9]\d{7})$/;
    return phoneRegex.test(value);
  }, {
    message: "Enter a valid Algerian phone number"
  })),
  country: z.optional(z.string({
    required_error: "Please select your country.",
  })),
  address: z.optional(z.string().min(2).max(50)),
});

