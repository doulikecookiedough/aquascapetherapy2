/* @vitest-environment node */

import { afterAll, afterEach, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/db";
import { createAquascapeImage } from "@/server/mutations/aquascape-images";
import { createAquascape } from "@/server/mutations/aquascapes";
import { createTank } from "@/server/mutations/tanks";

describe("aquascape image mutations", () => {
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

  it("creates the first image as primary even when the checkbox is not selected", async () => {
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

    const result = await createAquascapeImage({
      aquascapeId: aquascape.id,
      src: "https://example.com/moss-valley.jpg",
      alt: "Moss Valley aquascape in an ADA 120P aquarium.",
      isPrimary: false,
    });

    expect(result.image.aquascapeId).toBe(aquascape.id);
    expect(result.image.isPrimary).toBe(true);
    expect(result.image.displayOrder).toBe(0);
  });

  it("marks a newly added image as primary and clears the previous primary", async () => {
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
      status: "DRAFT",
    });

    await createAquascapeImage({
      aquascapeId: aquascape.id,
      src: "https://example.com/summit-drift-1.jpg",
      alt: "Summit Drift aquascape first view.",
      isPrimary: false,
    });

    const result = await createAquascapeImage({
      aquascapeId: aquascape.id,
      src: "https://example.com/summit-drift-2.jpg",
      alt: "Summit Drift aquascape second view.",
      isPrimary: true,
    });

    const images = await prisma.aquascapeImage.findMany({
      where: {
        aquascapeId: aquascape.id,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });

    expect(result.image.isPrimary).toBe(true);
    expect(images[0]?.isPrimary).toBe(false);
    expect(images[1]?.isPrimary).toBe(true);
    expect(images[1]?.displayOrder).toBe(1);
  });

  it("does not create an image for an aquascape owned by a different user", async () => {
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
      createAquascapeImage({
        aquascapeId: otherAquascape.id,
        src: "https://example.com/guest-layout.jpg",
        alt: "Guest layout image.",
        isPrimary: false,
      }),
    ).rejects.toThrow("Aquascape not found.");
  });
});
