import { prisma } from "@/lib/db";

export async function listTanks() {
  return prisma.tank.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
