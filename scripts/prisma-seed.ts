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
      const existingAquascape = await prisma.aquascape.findFirst({
        where: {
          tankId: savedTank.id,
          name: aquascape.name,
        },
      });

      if (existingAquascape === null) {
        await prisma.aquascape.create({
          data: {
            tankId: savedTank.id,
            name: aquascape.name,
            description: aquascape.description,
            isPublic: aquascape.isPublic,
          },
        });
      } else {
        await prisma.aquascape.update({
          where: {
            id: existingAquascape.id,
          },
          data: {
            description: aquascape.description,
            isPublic: aquascape.isPublic,
          },
        });
      }
    }
  }

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
