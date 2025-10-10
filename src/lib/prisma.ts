import { PrismaClient } from "../generated/prisma";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./prisma/dev.db";
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
