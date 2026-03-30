import { prisma } from "@/lib/db";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";

const aquascapeInclude = {
  images: {
    orderBy: [
      {
        isPrimary: "desc" as const,
      },
      {
        displayOrder: "asc" as const,
      },
    ],
  },
  equipment: {
    orderBy: {
      displayOrder: "asc" as const,
    },
  },
  plants: {
    include: {
      plant: true,
    },
    orderBy: {
      displayOrder: "asc" as const,
    },
  },
  fauna: {
    include: {
      fauna: true,
    },
    orderBy: {
      displayOrder: "asc" as const,
    },
  },
  facts: {
    include: {
      factType: true,
    },
    orderBy: {
      displayOrder: "asc" as const,
    },
  },
};

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
