/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { createAquascapeFact } from "@/server/mutations/aquascape-facts";
import { createAquascape } from "@/server/mutations/aquascapes";
import { createTank } from "@/server/mutations/tanks";

describe("aquascape fact mutations", () => {
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

  it("creates a fact for one of the portfolio owner's aquascapes", async () => {
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

    const factType = await prisma.factType.create({
      data: {
        name: "Light Period",
        slug: "light-period",
        isSystem: true,
        isRepeatable: false,
      },
    });

    const result = await createAquascapeFact({
      aquascapeId: aquascape.id,
      factTypeId: factType.id,
      value: "7 Hours",
    });

    expect(result.fact.aquascapeId).toBe(aquascape.id);
    expect(result.fact.factTypeId).toBe(factType.id);
    expect(result.fact.value).toBe("7 Hours");
    expect(result.fact.displayOrder).toBe(0);
  });

  it("does not create a fact for an aquascape owned by a different user", async () => {
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

    const factType = await prisma.factType.create({
      data: {
        name: "Temperature",
        slug: "temperature",
        unit: "C",
        isSystem: true,
        isRepeatable: false,
      },
    });

    await expect(
      createAquascapeFact({
        aquascapeId: otherAquascape.id,
        factTypeId: factType.id,
        value: "24",
      }),
    ).rejects.toThrow("Aquascape not found.");
  });

  it("does not allow the same fact type to be added twice to one aquascape", async () => {
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

    const factType = await prisma.factType.create({
      data: {
        name: "Water Change",
        slug: "water-change",
        isSystem: true,
        isRepeatable: false,
      },
    });

    await createAquascapeFact({
      aquascapeId: aquascape.id,
      factTypeId: factType.id,
      value: "25% weekly",
    });

    await expect(
      createAquascapeFact({
        aquascapeId: aquascape.id,
        factTypeId: factType.id,
        value: "30% weekly",
      }),
    ).rejects.toThrow("This fact has already been added to the aquascape.");
  });

  it("allows repeatable fact types to be added more than once", async () => {
    const tank = await createTank({
      name: "Repeatable Tank",
      lengthCm: 120,
      widthCm: 45,
      heightCm: 45,
    });

    const aquascape = await createAquascape({
      tankId: tank.id,
      name: "Repeatable Layout",
      slug: "repeatable-layout",
      description: null,
      status: "DRAFT",
    });

    const factType = await prisma.factType.create({
      data: {
        name: "Hardscape",
        slug: "hardscape",
        isSystem: false,
        isRepeatable: true,
      },
    });

    const first = await createAquascapeFact({
      aquascapeId: aquascape.id,
      factTypeId: factType.id,
      value: "Manzanita Wood",
    });

    const second = await createAquascapeFact({
      aquascapeId: aquascape.id,
      factTypeId: factType.id,
      value: "ADA Yamaya Stone",
    });

    expect(first.fact.displayOrder).toBe(0);
    expect(second.fact.displayOrder).toBe(1);
  });
});
