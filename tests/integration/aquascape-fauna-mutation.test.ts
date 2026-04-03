/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { createAquascape } from "@/server/mutations/aquascapes";
import { createAquascapeFauna } from "@/server/mutations/aquascape-fauna";
import { createTank } from "@/server/mutations/tanks";

describe("aquascape fauna mutations", () => {
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

  it("creates a fauna entry for one of the portfolio owner's aquascapes", async () => {
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
      description: null,
      status: "DRAFT",
    });

    const fauna = await prisma.fauna.create({
      data: {
        name: "Otocinclus Catfish",
        slug: "otocinclus-catfish",
      },
    });

    const result = await createAquascapeFauna({
      aquascapeId: aquascape.id,
      faunaId: fauna.id,
      notes: "Group of 6",
    });

    expect(result.fauna.aquascapeId).toBe(aquascape.id);
    expect(result.fauna.faunaId).toBe(fauna.id);
    expect(result.fauna.notes).toBe("Group of 6");
    expect(result.fauna.displayOrder).toBe(0);
  });

  it("does not create a fauna entry for an aquascape owned by a different user", async () => {
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

    const fauna = await prisma.fauna.create({
      data: {
        name: "Cherry Shrimp",
        slug: "cherry-shrimp",
      },
    });

    await expect(
      createAquascapeFauna({
        aquascapeId: otherAquascape.id,
        faunaId: fauna.id,
        notes: null,
      }),
    ).rejects.toThrow("Aquascape not found.");
  });

  it("does not allow the same fauna to be added twice to one aquascape", async () => {
    const tank = await createTank({
      name: "Display Tank",
      lengthCm: 120,
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

    const fauna = await prisma.fauna.create({
      data: {
        name: "Amano Shrimp",
        slug: "amano-shrimp",
      },
    });

    await createAquascapeFauna({
      aquascapeId: aquascape.id,
      faunaId: fauna.id,
      notes: null,
    });

    await expect(
      createAquascapeFauna({
        aquascapeId: aquascape.id,
        faunaId: fauna.id,
        notes: "Added later",
      }),
    ).rejects.toThrow("This fauna has already been added to the aquascape.");
  });
});
