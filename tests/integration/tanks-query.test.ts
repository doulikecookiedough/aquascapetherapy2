/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";
import { listTanks } from "@/server/queries/tanks";

describe("listTanks", () => {
  beforeEach(async () => {
    await prisma.aquascape.deleteMany();
    await prisma.tank.deleteMany();
    await prisma.user.deleteMany();
  });

  afterEach(async () => {
    await prisma.aquascape.deleteMany();
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
});
