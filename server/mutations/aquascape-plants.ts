import { prisma } from "@/lib/db";
import {
  createAquascapePlantSchema,
  type CreateAquascapePlantInput,
} from "@/lib/validations/aquascape-plant";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";

export async function createAquascapePlant(input: CreateAquascapePlantInput) {
  const owner = await getOrCreatePortfolioOwner();
  const data = createAquascapePlantSchema.parse(input);

  const aquascape = await prisma.aquascape.findFirst({
    where: {
      id: data.aquascapeId,
      tank: {
        userId: owner.id,
      },
    },
    include: {
      tank: {
        select: {
          id: true,
        },
      },
      plants: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!aquascape) {
    throw new Error("Aquascape not found.");
  }

  const plant = await prisma.plant.findUnique({
    where: {
      id: data.plantId,
    },
    select: {
      id: true,
    },
  });

  if (!plant) {
    throw new Error("Plant not found.");
  }

  const existingPlant = await prisma.aquascapePlant.findFirst({
    where: {
      aquascapeId: data.aquascapeId,
      plantId: data.plantId,
    },
    select: {
      id: true,
    },
  });

  if (existingPlant) {
    throw new Error("This plant has already been added to the aquascape.");
  }

  const entry = await prisma.aquascapePlant.create({
    data: {
      aquascapeId: data.aquascapeId,
      plantId: data.plantId,
      notes: data.notes,
      displayOrder: aquascape.plants.length,
    },
  });

  return {
    plant: entry,
    aquascapeId: aquascape.id,
    tankId: aquascape.tank.id,
    slug: aquascape.slug,
  };
}
