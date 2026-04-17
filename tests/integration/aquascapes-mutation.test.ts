/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import {
  createAquascape,
  deleteAquascape,
} from "@/server/mutations/aquascapes";
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

  it("deletes one of the portfolio owner's aquascapes", async () => {
    const tank = await createTank({
      name: "Gallery Tank",
      lengthCm: 90,
      widthCm: 45,
      heightCm: 45,
    });

    const aquascape = await createAquascape({
      tankId: tank.id,
      name: "Forest Edge",
      slug: "forest-edge",
      description: null,
      status: "DRAFT",
    });

    const result = await deleteAquascape({
      aquascapeId: aquascape.id,
    });

    const remainingAquascapes = await prisma.aquascape.findMany();

    expect(result.tankId).toBe(tank.id);
    expect(remainingAquascapes).toHaveLength(0);
  });

  it("does not delete an aquascape owned by a different user", async () => {
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

    const otherAquascape = await prisma.aquascape.create({
      data: {
        tankId: otherTank.id,
        name: "Guest Layout",
        slug: "guest-layout",
        status: "DRAFT",
      },
    });

    await expect(
      deleteAquascape({
        aquascapeId: otherAquascape.id,
      }),
    ).rejects.toThrow("Aquascape not found.");

    const remainingAquascapes = await prisma.aquascape.findMany();

    expect(remainingAquascapes).toHaveLength(1);
    expect(remainingAquascapes[0]?.id).toBe(otherAquascape.id);
  });

  it("deletes related journal records through cascade cleanup", async () => {
    const tank = await createTank({
      name: "Cascade Tank",
      lengthCm: 120,
      widthCm: 45,
      heightCm: 45,
    });

    const aquascape = await createAquascape({
      tankId: tank.id,
      name: "Cascade Layout",
      slug: "cascade-layout",
      description: null,
      status: "DRAFT",
    });

    const plant = await prisma.plant.create({
      data: {
        name: "Anubias barteri var. nana",
        slug: "anubias-barteri-var-nana",
      },
    });

    const fauna = await prisma.fauna.create({
      data: {
        name: "Otocinclus",
        slug: "otocinclus",
      },
    });

    const factType = await prisma.factType.create({
      data: {
        name: "Light Period",
        slug: "light-period",
        isSystem: true,
        isRepeatable: false,
      },
    });

    await prisma.aquascapeImage.create({
      data: {
        aquascapeId: aquascape.id,
        src: "https://example.com/cascade-layout.jpg",
        alt: "Cascade Layout aquascape.",
      },
    });

    await prisma.aquascapeEquipment.create({
      data: {
        aquascapeId: aquascape.id,
        category: "LIGHTING",
        name: "ADA Solar RGB",
      },
    });

    await prisma.aquascapePlant.create({
      data: {
        aquascapeId: aquascape.id,
        plantId: plant.id,
      },
    });

    await prisma.aquascapeFauna.create({
      data: {
        aquascapeId: aquascape.id,
        faunaId: fauna.id,
      },
    });

    await prisma.aquascapeFact.create({
      data: {
        aquascapeId: aquascape.id,
        factTypeId: factType.id,
        value: "7 hours",
      },
    });

    await deleteAquascape({
      aquascapeId: aquascape.id,
    });

    expect(await prisma.aquascapeImage.count()).toBe(0);
    expect(await prisma.aquascapeEquipment.count()).toBe(0);
    expect(await prisma.aquascapePlant.count()).toBe(0);
    expect(await prisma.aquascapeFauna.count()).toBe(0);
    expect(await prisma.aquascapeFact.count()).toBe(0);
  });
});
