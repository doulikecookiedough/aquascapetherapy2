import { prisma } from "@/lib/db";
import {
  createTankSchema,
  deleteTankSchema,
  type CreateTankInput,
  type DeleteTankInput,
} from "@/lib/validations/tank";
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

export async function deleteTank(input: DeleteTankInput) {
  const owner = await getOrCreatePortfolioOwner();
  const { tankId } = deleteTankSchema.parse(input);

  const result = await prisma.tank.deleteMany({
    where: {
      id: tankId,
      userId: owner.id,
    },
  });

  if (result.count === 0) {
    throw new Error("Tank not found.");
  }
}
