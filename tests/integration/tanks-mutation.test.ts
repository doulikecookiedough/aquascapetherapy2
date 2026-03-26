/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { createTank } from "@/server/mutations/tanks";

describe("createTank", () => {
  beforeEach(async () => {
    await prisma.tank.deleteMany();
  });

  afterEach(async () => {
    await prisma.tank.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates a tank record in the database", async () => {
    const tank = await createTank({
      name: "Nature Style 90P",
      volumeLiters: 180,
      description: "A larger display aquarium.",
    });

    expect(tank.name).toBe("Nature Style 90P");
    expect(tank.volumeLiters).toBe(180);

    const tanks = await prisma.tank.findMany();

    expect(tanks).toHaveLength(1);
    expect(tanks[0]?.id).toBe(tank.id);
  });

  it("stores undefined description as null in the database", async () => {
    const tank = await createTank({
      name: "Nano Forest",
      volumeLiters: 45,
      description: "",
    });

    expect(tank.description).toBeNull();
  });
});
