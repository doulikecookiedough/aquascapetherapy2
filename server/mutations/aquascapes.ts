import { prisma } from "@/lib/db";
import {
  createAquascapeSchema,
  type CreateAquascapeInput,
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
