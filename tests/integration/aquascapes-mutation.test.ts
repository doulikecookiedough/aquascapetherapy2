/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { createAquascape } from "@/server/mutations/aquascapes";
import { createTank } from "@/server/mutations/tanks";

describe("aquascape mutations", () => {
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

  it("creates an aquascape for one of the portfolio owner's tanks", async () => {
    const tank = await createTank({
      name: "ADA 120P",
      lengthCm: 120,
      widthCm: 45,
      heightCm: 45,
    });

    const aquascape = await createAquascape({
      tankId: tank.id,
      name: "Moss Valley",
      slug: "moss-valley",
      description: "A soft green layout with dense moss coverage.",
      status: "DRAFT",
    });

    expect(aquascape.tankId).toBe(tank.id);
    expect(aquascape.name).toBe("Moss Valley");
    expect(aquascape.slug).toBe("moss-valley");
    expect(aquascape.description).toBe(
      "A soft green layout with dense moss coverage.",
    );
    expect(aquascape.status).toBe("DRAFT");
    expect(aquascape.isPublic).toBe(false);

    const aquascapes = await prisma.aquascape.findMany();

    expect(aquascapes).toHaveLength(1);
    expect(aquascapes[0]?.id).toBe(aquascape.id);
  });

  it("sets approved aquascapes as public", async () => {
    const tank = await createTank({
      name: "ADA 150P",
      lengthCm: 150,
      widthCm: 60,
      heightCm: 60,
    });

    const aquascape = await createAquascape({
      tankId: tank.id,
      name: "Summit Drift",
      slug: "summit-drift",
      description: null,
      status: "APPROVED",
    });

    expect(aquascape.status).toBe("APPROVED");
    expect(aquascape.isPublic).toBe(true);
  });

  it("does not create an aquascape for a tank owned by a different user", async () => {
    const otherUser = await prisma.user.create({
      data: {
        email: "guest@portfolio.local",
        firstName: "Guest",
        lastName: "Aquarist",
      },
    });

    const otherTank = await prisma.tank.create({
      data: {
        name: "Guest Tank",
        lengthCm: 60,
        widthCm: 30,
        heightCm: 36,
        userId: otherUser.id,
      },
    });

    await expect(
      createAquascape({
        tankId: otherTank.id,
        name: "Unauthorized Layout",
        slug: "unauthorized-layout",
        description: null,
        status: "DRAFT",
      }),
    ).rejects.toThrow("Tank not found.");
  });

  it("does not allow duplicate slugs within the same tank", async () => {
    const tank = await createTank({
      name: "Gallery Tank",
      lengthCm: 90,
      widthCm: 45,
      heightCm: 45,
    });

    await createAquascape({
      tankId: tank.id,
      name: "First Layout",
      slug: "forest-edge",
      description: null,
      status: "DRAFT",
    });

    await expect(
      createAquascape({
        tankId: tank.id,
        name: "Second Layout",
        slug: "forest-edge",
        description: null,
        status: "DRAFT",
      }),
    ).rejects.toThrow("Aquascape slug already exists for this tank.");
  });
});
