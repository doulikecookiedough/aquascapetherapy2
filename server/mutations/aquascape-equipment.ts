import { prisma } from "@/lib/db";
import {
  createAquascapeEquipmentSchema,
  type CreateAquascapeEquipmentInput,
} from "@/lib/validations/aquascape-equipment";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";

export async function createAquascapeEquipment(
  input: CreateAquascapeEquipmentInput,
) {
  const owner = await getOrCreatePortfolioOwner();
  const data = createAquascapeEquipmentSchema.parse(input);

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
      equipment: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!aquascape) {
    throw new Error("Aquascape not found.");
  }

  const equipment = await prisma.aquascapeEquipment.create({
    data: {
      aquascapeId: data.aquascapeId,
      category: data.category,
      name: data.name,
      details: data.details,
      displayOrder: aquascape.equipment.length,
    },
  });

  return {
    equipment,
    aquascapeId: aquascape.id,
    tankId: aquascape.tank.id,
    slug: aquascape.slug,
  };
}
