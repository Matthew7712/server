import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: InstanceType<typeof PrismaClient>;
};

const prisma: InstanceType<typeof PrismaClient> =
  globalForPrisma.prisma || new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
