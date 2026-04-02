import { prisma } from "@/lib/db";
import {
  createAquascapeFactSchema,
  type CreateAquascapeFactInput,
} from "@/lib/validations/aquascape-fact";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";

export async function createAquascapeFact(input: CreateAquascapeFactInput) {
  const owner = await getOrCreatePortfolioOwner();
  const data = createAquascapeFactSchema.parse(input);

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
      facts: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!aquascape) {
    throw new Error("Aquascape not found.");
  }

  const factType = await prisma.factType.findUnique({
    where: {
      id: data.factTypeId,
    },
    select: {
      id: true,
    },
  });

  if (!factType) {
    throw new Error("Fact type not found.");
  }

  const existingFact = await prisma.aquascapeFact.findFirst({
    where: {
      aquascapeId: data.aquascapeId,
      factTypeId: data.factTypeId,
    },
    select: {
      id: true,
    },
  });

  if (existingFact) {
    throw new Error("This fact has already been added to the aquascape.");
  }

  const fact = await prisma.aquascapeFact.create({
    data: {
      aquascapeId: data.aquascapeId,
      factTypeId: data.factTypeId,
      value: data.value,
      displayOrder: aquascape.facts.length,
    },
  });

  return {
    fact,
    aquascapeId: aquascape.id,
    tankId: aquascape.tank.id,
    slug: aquascape.slug,
  };
}
