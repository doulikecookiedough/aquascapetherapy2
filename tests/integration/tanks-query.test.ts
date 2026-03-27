/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";
import { listTanks } from "@/server/queries/tanks";

describe("listTanks", () => {
  beforeEach(async () => {
    await prisma.aquascapeFact.deleteMany();
    await prisma.aquascapeFauna.deleteMany();
    await prisma.aquascapePlant.deleteMany();
    await prisma.aquascapeEquipment.deleteMany();
    await prisma.aquascapeImage.deleteMany();
    await prisma.aquascape.deleteMany();
    await prisma.factType.deleteMany();
    await prisma.fauna.deleteMany();
    await prisma.plant.deleteMany();
    await prisma.tank.deleteMany();
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.aquascapeFact.deleteMany();
    await prisma.aquascapeFauna.deleteMany();
    await prisma.aquascapePlant.deleteMany();
    await prisma.aquascapeEquipment.deleteMany();
    await prisma.aquascapeImage.deleteMany();
    await prisma.aquascape.deleteMany();
    await prisma.factType.deleteMany();
    await prisma.fauna.deleteMany();
    await prisma.plant.deleteMany();
    await prisma.tank.deleteMany();
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns only the portfolio owner's tanks ordered by newest first", async () => {
    const owner = await getOrCreatePortfolioOwner();
    const otherUser = await prisma.user.create({
      data: {
        email: "guest@portfolio.local",
        firstName: "Guest",
        lastName: "Aquarist",
      },
    });

    await prisma.tank.create({
      data: {
        name: "Living Room Display",
        lengthCm: 90,
        widthCm: 45,
        heightCm: 45,
        userId: owner.id,
      },
    });

    await prisma.tank.create({
      data: {
        name: "Studio Nano",
        lengthCm: 60,
        widthCm: 30,
        heightCm: 36,
        userId: owner.id,
      },
    });

    await prisma.tank.create({
      data: {
        name: "Guest Tank",
        lengthCm: 60,
        widthCm: 30,
        heightCm: 36,
        userId: otherUser.id,
      },
    });

    const tanks = await listTanks();

    expect(tanks).toHaveLength(2);
    expect(tanks.map((tank) => tank.name)).toEqual([
      "Studio Nano",
      "Living Room Display",
    ]);
  });

  it("returns the latest aquascape with related gallery data", async () => {
    const owner = await getOrCreatePortfolioOwner();
    const tank = await prisma.tank.create({
      data: {
        name: "ADA 120P",
        lengthCm: 120,
        widthCm: 45,
        heightCm: 45,
        userId: owner.id,
      },
    });

    const olderAquascape = await prisma.aquascape.create({
      data: {
        tankId: tank.id,
        name: "School Garden",
        slug: "school-garden",
        description: "An older layout.",
        isPublic: true,
        status: "APPROVED",
      },
    });

    await prisma.aquascape.create({
      data: {
        tankId: tank.id,
        name: "Pacific Northwest",
        slug: "pacific-northwest",
        description:
          "An aquascape inspired by the forests of the Pacific Northwest.",
        isPublic: true,
        status: "APPROVED",
        images: {
          create: [
            {
              src: "https://example.com/pacific-northwest.jpg",
              alt: "Pacific Northwest aquascape.",
              displayOrder: 0,
              isPrimary: true,
            },
          ],
        },
        equipment: {
          create: [
            {
              category: "LIGHTING",
              name: "ADA Solar RGB",
              details: "x2",
              displayOrder: 0,
            },
          ],
        },
      },
    });

    const plant = await prisma.plant.create({
      data: {
        name: "Anubias Pinto",
        slug: "anubias-pinto",
      },
    });

    const fauna = await prisma.fauna.create({
      data: {
        name: "Otocinclus Catfish",
        slug: "otocinclus-catfish",
      },
    });

    const factType = await prisma.factType.create({
      data: {
        name: "Temperature",
        slug: "temperature",
        unit: "C",
        isSystem: true,
      },
    });

    const latestAquascape = await prisma.aquascape.findFirstOrThrow({
      where: {
        tankId: tank.id,
        slug: "pacific-northwest",
      },
    });

    await prisma.aquascapePlant.create({
      data: {
        aquascapeId: latestAquascape.id,
        plantId: plant.id,
        displayOrder: 0,
      },
    });

    await prisma.aquascapeFauna.create({
      data: {
        aquascapeId: latestAquascape.id,
        faunaId: fauna.id,
        displayOrder: 0,
      },
    });

    await prisma.aquascapeFact.create({
      data: {
        aquascapeId: latestAquascape.id,
        factTypeId: factType.id,
        value: "22",
        displayOrder: 0,
      },
    });

    const tanks = await listTanks();

    expect(tanks).toHaveLength(1);
    expect(tanks[0]?.aquascapes).toHaveLength(1);
    expect(tanks[0]?.aquascapes[0]?.id).toBe(latestAquascape.id);
    expect(tanks[0]?.aquascapes[0]?.id).not.toBe(olderAquascape.id);
    expect(tanks[0]?.aquascapes[0]?.images[0]?.src).toBe(
      "https://example.com/pacific-northwest.jpg",
    );
    expect(tanks[0]?.aquascapes[0]?.equipment[0]?.name).toBe("ADA Solar RGB");
    expect(tanks[0]?.aquascapes[0]?.plants[0]?.plant.name).toBe("Anubias Pinto");
    expect(tanks[0]?.aquascapes[0]?.fauna[0]?.fauna.name).toBe(
      "Otocinclus Catfish",
    );
    expect(tanks[0]?.aquascapes[0]?.facts[0]?.factType.slug).toBe(
      "temperature",
    );
  });
});
