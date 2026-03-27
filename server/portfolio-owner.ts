import { portfolioOwnerProfile } from "@/data/portfolio-seed";
import { prisma } from "@/lib/db";

export async function getOrCreatePortfolioOwner() {
  return prisma.user.upsert({
    where: {
      email: portfolioOwnerProfile.email,
    },
    update: {},
    create: portfolioOwnerProfile,
  });
}
