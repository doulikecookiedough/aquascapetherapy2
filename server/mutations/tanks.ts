import { prisma } from "@/lib/db";
import { createTankSchema, type CreateTankInput } from "@/lib/validations/tank";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";

export async function createTank(input: CreateTankInput) {
  const owner = await getOrCreatePortfolioOwner();
  const data = createTankSchema.parse(input);

  return prisma.tank.create({
    data: {
      ...data,
      userId: owner.id,
    },
  });
}
