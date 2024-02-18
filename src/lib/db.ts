import { PrismaClient } from "@prisma/client";

/**
 * Global declaration for the Prisma client instance.
 * @global
 * @var {PrismaClient | undefined} prisma - The Prisma client instance.
 */
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
