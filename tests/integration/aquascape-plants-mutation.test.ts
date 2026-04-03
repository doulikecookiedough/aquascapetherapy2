/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { createAquascapePlant } from "@/server/mutations/aquascape-plants";
import { createAquascape } from "@/server/mutations/aquascapes";
import { createTank } from "@/server/mutations/tanks";

describe("aquascape plant mutations", () => {
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

  it("creates a plant entry for one of the portfolio owner's aquascapes", async () => {
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

    const plant = await prisma.plant.create({
      data: {
        name: "Java Fern",
        slug: "java-fern",
      },
    });

    const result = await createAquascapePlant({
      aquascapeId: aquascape.id,
      plantId: plant.id,
      notes: "Attached to driftwood",
    });

    expect(result.plant.aquascapeId).toBe(aquascape.id);
    expect(result.plant.plantId).toBe(plant.id);
    expect(result.plant.notes).toBe("Attached to driftwood");
    expect(result.plant.displayOrder).toBe(0);
  });

  it("does not create a plant entry for an aquascape owned by a different user", async () => {
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

    const plant = await prisma.plant.create({
      data: {
        name: "Bucephalandra",
        slug: "bucephalandra",
      },
    });

    await expect(
      createAquascapePlant({
        aquascapeId: otherAquascape.id,
        plantId: plant.id,
        notes: null,
      }),
    ).rejects.toThrow("Aquascape not found.");
  });

  it("does not allow the same plant to be added twice to one aquascape", async () => {
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

    const plant = await prisma.plant.create({
      data: {
        name: "Anubias Nana Petite",
        slug: "anubias-nana-petite",
      },
    });

    await createAquascapePlant({
      aquascapeId: aquascape.id,
      plantId: plant.id,
      notes: null,
    });

    await expect(
      createAquascapePlant({
        aquascapeId: aquascape.id,
        plantId: plant.id,
        notes: "Foreground accent",
      }),
    ).rejects.toThrow("This plant has already been added to the aquascape.");
  });
});
