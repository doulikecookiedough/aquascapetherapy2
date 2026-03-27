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
        include: {
          images: {
            orderBy: [
              {
                isPrimary: "desc",
              },
              {
                displayOrder: "asc",
              },
            ],
          },
          equipment: {
            orderBy: {
              displayOrder: "asc",
            },
          },
          plants: {
            include: {
              plant: true,
            },
            orderBy: {
              displayOrder: "asc",
            },
          },
          fauna: {
            include: {
              fauna: true,
            },
            orderBy: {
              displayOrder: "asc",
            },
          },
          facts: {
            include: {
              factType: true,
            },
            orderBy: {
              displayOrder: "asc",
            },
          },
        },
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
