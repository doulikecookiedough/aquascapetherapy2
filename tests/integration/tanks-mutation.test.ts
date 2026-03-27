/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { createTank, deleteTank } from "@/server/mutations/tanks";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";

describe("tank mutations", () => {
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

  it("creates a tank record in the database", async () => {
    const owner = await getOrCreatePortfolioOwner();
    const tank = await createTank({
      name: "Living Room Display",
      lengthCm: 90,
      widthCm: 45,
      heightCm: 45,
    });

    expect(tank.name).toBe("Living Room Display");
    expect(tank.lengthCm).toBe(90);
    expect(tank.widthCm).toBe(45);
    expect(tank.heightCm).toBe(45);
    expect(tank.userId).toBe(owner.id);
    expect(tank.isPublic).toBe(false);

    const tanks = await prisma.tank.findMany();

    expect(tanks).toHaveLength(1);
    expect(tanks[0]?.id).toBe(tank.id);
  });

  it("creates tanks as private by default", async () => {
    const tank = await createTank({
      name: "Studio Nano",
      lengthCm: 60,
      widthCm: 30,
      heightCm: 36,
    });

    expect(tank.isPublic).toBe(false);
  });

  it("deletes one of the portfolio owner's tanks", async () => {
    const tank = await createTank({
      name: "Gallery Tank",
      lengthCm: 120,
      widthCm: 45,
      heightCm: 45,
    });

    await deleteTank({
      tankId: tank.id,
    });

    const remainingTanks = await prisma.tank.findMany();

    expect(remainingTanks).toHaveLength(0);
  });

  it("does not delete a tank owned by a different user", async () => {
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
      deleteTank({
        tankId: otherTank.id,
      }),
    ).rejects.toThrow("Tank not found.");

    const remainingTanks = await prisma.tank.findMany();

    expect(remainingTanks).toHaveLength(1);
    expect(remainingTanks[0]?.id).toBe(otherTank.id);
  });
});
