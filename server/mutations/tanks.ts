import { prisma } from "@/lib/db";
import { createTankSchema, type CreateTankInput } from "@/lib/validations/tank";

export async function createTank(input: CreateTankInput) {
  const data = createTankSchema.parse(input);

  return prisma.tank.create({
    data,
  });
}
