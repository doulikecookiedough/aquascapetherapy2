/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { createTank } from "@/server/mutations/tanks";
import { getOrCreatePortfolioOwner } from "@/server/portfolio-owner";

describe("createTank", () => {
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
});
