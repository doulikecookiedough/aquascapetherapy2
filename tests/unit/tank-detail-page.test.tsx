import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import TankDetailPage from "../../app/(app)/tanks/[tankId]/page";
import { getTankById } from "../../server/queries/tanks";

vi.mock("../../server/queries/tanks", () => ({
  getTankById: vi.fn(),
}));

describe("Tank detail page", () => {
  beforeEach(() => {
    vi.mocked(getTankById).mockReset();
  });

  it("renders the latest aquascape hero and the older aquascape history", async () => {
    vi.mocked(getTankById).mockResolvedValue({
      id: "tank-1",
      name: "ADA 120P",
      lengthCm: 120,
      widthCm: 45,
      heightCm: 45,
      isPublic: true,
      userId: "user-1",
      createdAt: new Date("2026-03-25T12:00:00.000Z"),
      updatedAt: new Date("2026-03-25T12:00:00.000Z"),
      aquascapes: [
        {
          id: "scape-1",
          tankId: "tank-1",
          name: "Giant Pebbles",
          slug: "giant-pebbles",
          description: "A stone-forward layout with broader planting groups.",
          isPublic: true,
          status: "APPROVED",
          createdAt: new Date("2026-03-27T12:00:00.000Z"),
          updatedAt: new Date("2026-03-27T12:00:00.000Z"),
          images: [
            {
              id: "image-1",
              aquascapeId: "scape-1",
              src: "https://example.com/giant-pebbles.jpg",
              alt: "Giant Pebbles aquascape in an ADA 120P aquarium.",
              displayOrder: 0,
              isPrimary: true,
              createdAt: new Date("2026-03-27T12:00:00.000Z"),
              updatedAt: new Date("2026-03-27T12:00:00.000Z"),
            },
          ],
          equipment: [],
          plants: [
            {
              id: "plant-link-1",
              aquascapeId: "scape-1",
              plantId: "plant-1",
              displayOrder: 0,
              notes: null,
              createdAt: new Date("2026-03-27T12:00:00.000Z"),
              updatedAt: new Date("2026-03-27T12:00:00.000Z"),
              plant: {
                id: "plant-1",
                name: "Aponogeton Longiplumulosus",
                slug: "aponogeton-longiplumulosus",
                scientificName: null,
                commonName: null,
                description: null,
                createdAt: new Date("2026-03-27T12:00:00.000Z"),
                updatedAt: new Date("2026-03-27T12:00:00.000Z"),
              },
            },
          ],
          fauna: [
            {
              id: "fauna-link-1",
              aquascapeId: "scape-1",
              faunaId: "fauna-1",
              displayOrder: 0,
              notes: null,
              createdAt: new Date("2026-03-27T12:00:00.000Z"),
              updatedAt: new Date("2026-03-27T12:00:00.000Z"),
              fauna: {
                id: "fauna-1",
                name: "Amano Shrimp",
                slug: "amano-shrimp",
                description: null,
                createdAt: new Date("2026-03-27T12:00:00.000Z"),
                updatedAt: new Date("2026-03-27T12:00:00.000Z"),
              },
            },
          ],
          facts: [
            {
              id: "fact-1",
              aquascapeId: "scape-1",
              factTypeId: "fact-type-1",
              value: "7 Hours",
              displayOrder: 0,
              createdAt: new Date("2026-03-27T12:00:00.000Z"),
              updatedAt: new Date("2026-03-27T12:00:00.000Z"),
              factType: {
                id: "fact-type-1",
                name: "Light Period",
                slug: "light-period",
                unit: null,
                isSystem: true,
                createdAt: new Date("2026-03-27T12:00:00.000Z"),
                updatedAt: new Date("2026-03-27T12:00:00.000Z"),
              },
            },
          ],
        },
        {
          id: "scape-2",
          tankId: "tank-1",
          name: "School Garden",
          slug: "school-garden",
          description: "An earlier layout documented in this aquarium.",
          isPublic: true,
          status: "APPROVED",
          createdAt: new Date("2026-03-26T12:00:00.000Z"),
          updatedAt: new Date("2026-03-26T12:00:00.000Z"),
          images: [],
          equipment: [],
          plants: [],
          fauna: [],
          facts: [],
        },
      ],
    });

    render(await TankDetailPage({ params: Promise.resolve({ tankId: "tank-1" }) }));

    expect(
      screen.getByRole("link", { name: /back to aquariums/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "ADA 120P" }),
    ).toBeInTheDocument();
    expect(screen.getByText("120 x 45 x 45 cm")).toBeInTheDocument();
    expect(
      screen.getByText(/a living record of the aquascapes documented in this aquarium/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Current Aquascape" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Giant Pebbles")).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Giant Pebbles aquascape in an ADA 120P aquarium.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/1 plant/i)).toBeInTheDocument();
    expect(screen.getByText(/1 fauna/i)).toBeInTheDocument();
    expect(screen.getByText(/1 fact/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view current aquascape/i }),
    ).toHaveAttribute("href", "/aquascapes/giant-pebbles");
    expect(
      screen.getByRole("heading", { name: "Aquascape History" }),
    ).toBeInTheDocument();
    expect(screen.getByText("School Garden")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /view aquascape/i }),
    ).toHaveAttribute("href", "/aquascapes/school-garden");
  });
});
