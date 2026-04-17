import { prisma } from "@/lib/db";
import {
  createAquascapeSchema,
  deleteAquascapeSchema,
  type CreateAquascapeInput,
  type DeleteAquascapeInput,
} from "@/lib/validations/aquascape";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";

export async function createAquascape(input: CreateAquascapeInput) {
  const owner = await getOrCreatePortfolioOwner();
  const data = createAquascapeSchema.parse(input);

  const tank = await prisma.tank.findFirst({
    where: {
      id: data.tankId,
      userId: owner.id,
    },
    select: {
      id: true,
    },
  });

  if (!tank) {
    throw new Error("Tank not found.");
  }

  const existingAquascape = await prisma.aquascape.findFirst({
    where: {
      tankId: data.tankId,
      slug: data.slug,
    },
    select: {
      id: true,
    },
  });

  if (existingAquascape) {
    throw new Error("Aquascape slug already exists for this tank.");
  }

  return prisma.aquascape.create({
    data: {
      tankId: data.tankId,
      name: data.name,
      slug: data.slug,
      description: data.description,
      status: data.status,
      isPublic: data.status === "APPROVED",
    },
  });
}

export async function deleteAquascape(input: DeleteAquascapeInput) {
  const owner = await getOrCreatePortfolioOwner();
  const { aquascapeId } = deleteAquascapeSchema.parse(input);

  const aquascape = await prisma.aquascape.findFirst({
    where: {
      id: aquascapeId,
      tank: {
        userId: owner.id,
      },
    },
    select: {
      id: true,
      tankId: true,
    },
  });

  if (!aquascape) {
    throw new Error("Aquascape not found.");
  }

  await prisma.aquascape.delete({
    where: {
      id: aquascape.id,
    },
  });

  return {
    tankId: aquascape.tankId,
  };
}
