import { prisma } from "@/lib/db";
import {
  createAquascapeImageSchema,
  type CreateAquascapeImageInput,
} from "@/lib/validations/aquascape-image";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";

export async function createAquascapeImage(input: CreateAquascapeImageInput) {
  const owner = await getOrCreatePortfolioOwner();
  const data = createAquascapeImageSchema.parse(input);

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
      images: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!aquascape) {
    throw new Error("Aquascape not found.");
  }

  const shouldBePrimary = data.isPrimary || aquascape.images.length === 0;

  return prisma.$transaction(async (tx) => {
    if (shouldBePrimary) {
      await tx.aquascapeImage.updateMany({
        where: {
          aquascapeId: data.aquascapeId,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    const image = await tx.aquascapeImage.create({
      data: {
        aquascapeId: data.aquascapeId,
        src: data.src,
        alt: data.alt,
        isPrimary: shouldBePrimary,
        displayOrder: aquascape.images.length,
      },
    });

    return {
      image,
      aquascapeId: aquascape.id,
      tankId: aquascape.tank.id,
      slug: aquascape.slug,
    };
  });
}
