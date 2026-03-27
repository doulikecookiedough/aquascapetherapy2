import { prisma } from "@/lib/db";

const portfolioOwnerProfile = {
  email: "dou@portfolio.local",
  firstName: "Dou",
  lastName: "Portfolio",
  bio: "Public-facing profile owner for the initial aquascaping portfolio.",
} as const;

export async function getOrCreatePortfolioOwner() {
  return prisma.user.upsert({
    where: {
      email: portfolioOwnerProfile.email,
    },
    update: {},
    create: portfolioOwnerProfile,
  });
}
