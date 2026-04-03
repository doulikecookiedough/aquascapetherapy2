/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { createAquascapeEquipment } from "@/server/mutations/aquascape-equipment";
import { createAquascape } from "@/server/mutations/aquascapes";
import { createTank } from "@/server/mutations/tanks";

describe("aquascape equipment mutations", () => {
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

  it("creates equipment for one of the portfolio owner's aquascapes", async () => {
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

    const result = await createAquascapeEquipment({
      aquascapeId: aquascape.id,
      category: "LIGHTING",
      name: "ADA Solar RGB",
      details: "x2",
    });

    expect(result.equipment.aquascapeId).toBe(aquascape.id);
    expect(result.equipment.category).toBe("LIGHTING");
    expect(result.equipment.name).toBe("ADA Solar RGB");
    expect(result.equipment.details).toBe("x2");
    expect(result.equipment.displayOrder).toBe(0);
  });

  it("does not create equipment for an aquascape owned by a different user", async () => {
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
      createAquascapeEquipment({
        aquascapeId: otherAquascape.id,
        category: "FILTER",
        name: "Oase Biomaster",
        details: null,
      }),
    ).rejects.toThrow("Aquascape not found.");
  });

  it("appends equipment after existing entries", async () => {
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

    const first = await createAquascapeEquipment({
      aquascapeId: aquascape.id,
      category: "LIGHTING",
      name: "Week Aqua P900",
      details: null,
    });

    const second = await createAquascapeEquipment({
      aquascapeId: aquascape.id,
      category: "CO2",
      name: "CO2Art Pro-SE",
      details: "dual stage",
    });

    expect(first.equipment.displayOrder).toBe(0);
    expect(second.equipment.displayOrder).toBe(1);
  });
});
