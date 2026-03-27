import { prisma } from "@/lib/db";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";

export async function listTanks() {
  const owner = await getOrCreatePortfolioOwner();

  return prisma.tank.findMany({
    where: {
      userId: owner.id,
    },
    include: {
      aquascapes: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
