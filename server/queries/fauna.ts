import { prisma } from "@/lib/db";

export async function listFauna() {
  return prisma.fauna.findMany({
    orderBy: {
      name: "asc",
    },
  });
}
