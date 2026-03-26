/* @vitest-environment node */

import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { listTanks } from "@/server/queries/tanks";

describe("listTanks", () => {
  beforeEach(async () => {
    await prisma.tank.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns tanks ordered by newest first", async () => {
    await prisma.tank.create({
      data: {
        name: "Nature Style 90P",
        volumeLiters: 180,
        description: "A larger display aquarium.",
      },
    });

    await prisma.tank.create({
      data: {
        name: "Nano Forest",
        volumeLiters: 45,
        description: "A smaller tank for focused plant growth.",
      },
    });

    const tanks = await listTanks();

    expect(tanks).toHaveLength(2);
    expect(tanks.map((tank) => tank.name)).toEqual([
      "Nano Forest",
      "Nature Style 90P",
    ]);
  });
});
