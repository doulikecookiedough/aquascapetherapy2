import { prisma } from "@/lib/db";
import {
  createAquascapeFaunaSchema,
  type CreateAquascapeFaunaInput,
} from "@/lib/validations/aquascape-fauna";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";

export async function createAquascapeFauna(input: CreateAquascapeFaunaInput) {
  const owner = await getOrCreatePortfolioOwner();
  const data = createAquascapeFaunaSchema.parse(input);

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
      fauna: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!aquascape) {
    throw new Error("Aquascape not found.");
  }

  const fauna = await prisma.fauna.findUnique({
    where: {
      id: data.faunaId,
    },
    select: {
      id: true,
    },
  });

  if (!fauna) {
    throw new Error("Fauna not found.");
  }

  const existingFauna = await prisma.aquascapeFauna.findFirst({
    where: {
      aquascapeId: data.aquascapeId,
      faunaId: data.faunaId,
    },
    select: {
      id: true,
    },
  });

  if (existingFauna) {
    throw new Error("This fauna has already been added to the aquascape.");
  }

  const entry = await prisma.aquascapeFauna.create({
    data: {
      aquascapeId: data.aquascapeId,
      faunaId: data.faunaId,
      notes: data.notes,
      displayOrder: aquascape.fauna.length,
    },
  });

  return {
    fauna: entry,
    aquascapeId: aquascape.id,
    tankId: aquascape.tank.id,
    slug: aquascape.slug,
  };
}
