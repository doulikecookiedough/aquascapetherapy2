import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";

import { portfolioOwnerProfile, portfolioSeedTanks } from "@/data/portfolio-seed";
import { PrismaClient } from "@/prisma/generated/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString,
  }),
});

async function seedPortfolioTanks() {
  const owner = await prisma.user.upsert({
    where: {
      email: portfolioOwnerProfile.email,
    },
    update: {
      firstName: portfolioOwnerProfile.firstName,
      lastName: portfolioOwnerProfile.lastName,
      bio: portfolioOwnerProfile.bio,
    },
    create: {
      email: portfolioOwnerProfile.email,
      firstName: portfolioOwnerProfile.firstName,
      lastName: portfolioOwnerProfile.lastName,
      bio: portfolioOwnerProfile.bio,
    },
  });

  console.log(`Portfolio owner ready: ${owner.email}`);
  console.log(`Seeding ${portfolioSeedTanks.length} tank(s)`);

  for (const tank of portfolioSeedTanks) {
    const existingTank = await prisma.tank.findFirst({
      where: {
        userId: owner.id,
        name: tank.name,
      },
    });

    const savedTank =
      existingTank === null
        ? await prisma.tank.create({
            data: {
              name: tank.name,
              lengthCm: tank.lengthCm,
              widthCm: tank.widthCm,
              heightCm: tank.heightCm,
              isPublic: tank.isPublic,
              userId: owner.id,
            },
          })
        : await prisma.tank.update({
            where: {
              id: existingTank.id,
            },
            data: {
              lengthCm: tank.lengthCm,
              widthCm: tank.widthCm,
              heightCm: tank.heightCm,
              isPublic: tank.isPublic,
            },
          });

    console.log(`Seeded tank: ${savedTank.name}`);

    for (const aquascape of tank.aquascapes) {
      const savedAquascape = await prisma.aquascape.upsert({
        where: {
          tankId_slug: {
            tankId: savedTank.id,
            slug: aquascape.slug,
          },
        },
        update: {
          name: aquascape.name,
          description: aquascape.description,
          isPublic: aquascape.isPublic,
          status: aquascape.status,
        },
        create: {
          tankId: savedTank.id,
          name: aquascape.name,
          slug: aquascape.slug,
          description: aquascape.description,
          isPublic: aquascape.isPublic,
          status: aquascape.status,
        },
      });

      await prisma.aquascapeImage.deleteMany({
        where: {
          aquascapeId: savedAquascape.id,
        },
      });
      await prisma.aquascapeEquipment.deleteMany({
        where: {
          aquascapeId: savedAquascape.id,
        },
      });
      await prisma.aquascapePlant.deleteMany({
        where: {
          aquascapeId: savedAquascape.id,
        },
      });
      await prisma.aquascapeFauna.deleteMany({
        where: {
          aquascapeId: savedAquascape.id,
        },
      });
      await prisma.aquascapeFact.deleteMany({
        where: {
          aquascapeId: savedAquascape.id,
        },
      });

      for (const image of aquascape.images) {
        await prisma.aquascapeImage.create({
          data: {
            aquascapeId: savedAquascape.id,
            src: image.src,
            alt: image.alt,
            displayOrder: image.displayOrder,
            isPrimary: image.isPrimary,
          },
        });
      }

      for (const equipment of aquascape.equipment) {
        await prisma.aquascapeEquipment.create({
          data: {
            aquascapeId: savedAquascape.id,
            category: equipment.category,
            name: equipment.name,
            details: equipment.details,
            displayOrder: equipment.displayOrder,
          },
        });
      }

      for (const plant of aquascape.plants) {
        const savedPlant = await prisma.plant.upsert({
          where: {
            slug: plant.slug,
          },
          update: {
            name: plant.name,
            scientificName: plant.scientificName,
            commonName: plant.commonName,
            description: plant.description,
          },
          create: {
            name: plant.name,
            slug: plant.slug,
            scientificName: plant.scientificName,
            commonName: plant.commonName,
            description: plant.description,
          },
        });

        await prisma.aquascapePlant.create({
          data: {
            aquascapeId: savedAquascape.id,
            plantId: savedPlant.id,
            displayOrder: plant.displayOrder,
            notes: plant.notes,
          },
        });
      }

      for (const fauna of aquascape.fauna) {
        const savedFauna = await prisma.fauna.upsert({
          where: {
            slug: fauna.slug,
          },
          update: {
            name: fauna.name,
            description: fauna.description,
          },
          create: {
            name: fauna.name,
            slug: fauna.slug,
            description: fauna.description,
          },
        });

        await prisma.aquascapeFauna.create({
          data: {
            aquascapeId: savedAquascape.id,
            faunaId: savedFauna.id,
            displayOrder: fauna.displayOrder,
            notes: fauna.notes,
          },
        });
      }

      for (const fact of aquascape.facts) {
        const factType = await prisma.factType.upsert({
          where: {
            slug: fact.slug,
          },
          update: {
            name: fact.name,
            unit: fact.unit,
            isSystem: fact.isSystem,
            isRepeatable: fact.isRepeatable ?? false,
          },
          create: {
            name: fact.name,
            slug: fact.slug,
            unit: fact.unit,
            isSystem: fact.isSystem,
            isRepeatable: fact.isRepeatable ?? false,
          },
        });

        await prisma.aquascapeFact.create({
          data: {
            aquascapeId: savedAquascape.id,
            factTypeId: factType.id,
            value: fact.value,
            displayOrder: fact.displayOrder,
          },
        });
      }

      console.log(`Seeded aquascape: ${savedAquascape.name}`);
    }
  }

  // Remove legacy fact types that are no longer referenced after reseeding.
  await prisma.factType.deleteMany({
    where: {
      facts: {
        none: {},
      },
    },
  });

  const totalTanks = await prisma.tank.count({
    where: {
      userId: owner.id,
    },
  });

  console.log(`Portfolio owner now has ${totalTanks} tank(s)`);
}

async function main() {
  await seedPortfolioTanks();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
