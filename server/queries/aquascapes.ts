import { prisma } from "@/lib/db";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";
import { aquascapeInclude } from "@/server/queries/aquascape-include";

export async function getAquascapeBySlug(slug: string) {
  const owner = await getOrCreatePortfolioOwner();

  return prisma.aquascape.findFirst({
    where: {
      slug,
      tank: {
        userId: owner.id,
      },
    },
    include: {
      ...aquascapeInclude,
      tank: true,
    },
  });
}
