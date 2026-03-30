/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";
import { getAquascapeBySlug } from "@/server/queries/aquascapes";

describe("getAquascapeBySlug", () => {
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

  it("returns an owner-scoped aquascape with all related journal data", async () => {
    const owner = await getOrCreatePortfolioOwner();
    const guest = await prisma.user.create({
      data: {
        email: "guest@portfolio.local",
        firstName: "Guest",
        lastName: "Aquarist",
      },
    });

    const tank = await prisma.tank.create({
      data: {
        name: "ADA 120P",
        lengthCm: 120,
        widthCm: 45,
        heightCm: 45,
        userId: owner.id,
      },
    });

    const guestTank = await prisma.tank.create({
      data: {
        name: "Guest Tank",
        lengthCm: 60,
        widthCm: 30,
        heightCm: 36,
        userId: guest.id,
      },
    });

    const aquascape = await prisma.aquascape.create({
      data: {
        tankId: tank.id,
        name: "Pacific Northwest",
        slug: "pacific-northwest",
        description: "A forest-inspired layout.",
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

    await prisma.aquascape.create({
      data: {
        tankId: guestTank.id,
        name: "Guest Layout",
        slug: "guest-layout",
        isPublic: true,
        status: "APPROVED",
      },
    });

    const plant = await prisma.plant.create({
      data: {
        name: "Java Fern",
        slug: "java-fern",
      },
    });

    const fauna = await prisma.fauna.create({
      data: {
        name: "Cherry Shrimp",
        slug: "cherry-shrimp",
      },
    });

    const factType = await prisma.factType.create({
      data: {
        name: "Light Period",
        slug: "light-period",
        isSystem: true,
      },
    });

    await prisma.aquascapePlant.create({
      data: {
        aquascapeId: aquascape.id,
        plantId: plant.id,
        displayOrder: 0,
      },
    });

    await prisma.aquascapeFauna.create({
      data: {
        aquascapeId: aquascape.id,
        faunaId: fauna.id,
        displayOrder: 0,
      },
    });

    await prisma.aquascapeFact.create({
      data: {
        aquascapeId: aquascape.id,
        factTypeId: factType.id,
        value: "7 Hours",
        displayOrder: 0,
      },
    });

    const result = await getAquascapeBySlug("pacific-northwest");
    const missing = await getAquascapeBySlug("guest-layout");

    expect(result?.slug).toBe("pacific-northwest");
    expect(result?.tank.name).toBe("ADA 120P");
    expect(result?.images[0]?.src).toBe("https://example.com/pacific-northwest.jpg");
    expect(result?.equipment[0]?.name).toBe("ADA Solar RGB");
    expect(result?.plants[0]?.plant.slug).toBe("java-fern");
    expect(result?.fauna[0]?.fauna.slug).toBe("cherry-shrimp");
    expect(result?.facts[0]?.factType.slug).toBe("light-period");
    expect(missing).toBeNull();
  });
});
