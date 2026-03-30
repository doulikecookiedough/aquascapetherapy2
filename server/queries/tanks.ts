import { prisma } from "@/lib/db";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";
import { aquascapeInclude } from "@/server/queries/aquascape-include";

export async function listTanks() {
  const owner = await getOrCreatePortfolioOwner();

  return prisma.tank.findMany({
    where: {
      userId: owner.id,
    },
    include: {
      aquascapes: {
        include: aquascapeInclude,
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

export async function getTankById(tankId: string) {
  const owner = await getOrCreatePortfolioOwner();

  return prisma.tank.findFirst({
    where: {
      id: tankId,
      userId: owner.id,
    },
    include: {
      aquascapes: {
        include: aquascapeInclude,
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
}
