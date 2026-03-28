import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import TanksPage from "../../app/(app)/tanks/page";
import { listTanks } from "../../server/queries/tanks";

vi.mock("../../server/queries/tanks", () => ({
  listTanks: vi.fn(),
}));

describe("Tanks page", () => {
  beforeEach(() => {
    vi.mocked(listTanks).mockReset();
  });

  it("renders an empty state when there are no tanks", async () => {
    vi.mocked(listTanks).mockResolvedValue([]);

    render(await TanksPage());

    expect(
      screen.getByRole("heading", { name: "Tanks" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Tank" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", { name: "Tank Name" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Delete Tank" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Tank Inventory" })).toBeInTheDocument();
    expect(screen.getByText("No tanks yet")).toBeInTheDocument();
    expect(
      screen.getByText(/first database-backed page is now reading tank records/i),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Add Tank" }));

    expect(screen.getByRole("textbox", { name: "Tank Name" })).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Length (cm)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Width (cm)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Height (cm)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Tank" }),
    ).toBeInTheDocument();
  });

  it("renders tank records from the query", async () => {
    vi.mocked(listTanks).mockResolvedValue([
      {
        id: "tank-1",
        name: "Living Room Display",
        lengthCm: 90,
        widthCm: 45,
        heightCm: 45,
        isPublic: false,
        userId: "user-1",
        createdAt: new Date("2026-03-25T12:00:00.000Z"),
        updatedAt: new Date("2026-03-25T12:00:00.000Z"),
        aquascapes: [
          {
            id: "scape-1",
            tankId: "tank-1",
            name: "Pacific Northwest",
            slug: "pacific-northwest",
            description:
              "An aquascape inspired by the forests of the pacific northwest.",
            isPublic: true,
            status: "APPROVED",
            createdAt: new Date("2026-03-26T12:00:00.000Z"),
            updatedAt: new Date("2026-03-26T12:00:00.000Z"),
            images: [
              {
                id: "image-1",
                aquascapeId: "scape-1",
                src: "https://example.com/pacific-northwest.jpg",
                alt: "Pacific Northwest aquascape in an ADA 120P aquarium.",
                displayOrder: 0,
                isPrimary: true,
                createdAt: new Date("2026-03-26T12:00:00.000Z"),
                updatedAt: new Date("2026-03-26T12:00:00.000Z"),
              },
            ],
            equipment: [
              {
                id: "equipment-1",
                aquascapeId: "scape-1",
                category: "LIGHTING",
                name: "ADA Solar RGB",
                details: "x2",
                displayOrder: 0,
                createdAt: new Date("2026-03-26T12:00:00.000Z"),
                updatedAt: new Date("2026-03-26T12:00:00.000Z"),
              },
            ],
            plants: [
              {
                id: "plant-link-1",
                aquascapeId: "scape-1",
                plantId: "plant-1",
                displayOrder: 0,
                notes: null,
                createdAt: new Date("2026-03-26T12:00:00.000Z"),
                updatedAt: new Date("2026-03-26T12:00:00.000Z"),
                plant: {
                  id: "plant-1",
                  name: "Java Fern",
                  slug: "java-fern",
                  scientificName: null,
                  commonName: null,
                  description: null,
                  createdAt: new Date("2026-03-26T12:00:00.000Z"),
                  updatedAt: new Date("2026-03-26T12:00:00.000Z"),
                },
              },
              {
                id: "plant-link-2",
                aquascapeId: "scape-1",
                plantId: "plant-2",
                displayOrder: 1,
                notes: null,
                createdAt: new Date("2026-03-26T12:00:00.000Z"),
                updatedAt: new Date("2026-03-26T12:00:00.000Z"),
                plant: {
                  id: "plant-2",
                  name: "Anubias Pinto",
                  slug: "anubias-pinto",
                  scientificName: null,
                  commonName: null,
                  description: null,
                  createdAt: new Date("2026-03-26T12:00:00.000Z"),
                  updatedAt: new Date("2026-03-26T12:00:00.000Z"),
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
                createdAt: new Date("2026-03-26T12:00:00.000Z"),
                updatedAt: new Date("2026-03-26T12:00:00.000Z"),
                fauna: {
                  id: "fauna-1",
                  name: "Cherry Shrimp",
                  slug: "cherry-shrimp",
                  description: null,
                  createdAt: new Date("2026-03-26T12:00:00.000Z"),
                  updatedAt: new Date("2026-03-26T12:00:00.000Z"),
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
                createdAt: new Date("2026-03-26T12:00:00.000Z"),
                updatedAt: new Date("2026-03-26T12:00:00.000Z"),
                factType: {
                  id: "fact-type-1",
                  name: "Light Period",
                  slug: "light-period",
                  unit: null,
                  isSystem: true,
                  createdAt: new Date("2026-03-26T12:00:00.000Z"),
                  updatedAt: new Date("2026-03-26T12:00:00.000Z"),
                },
              },
            ],
          },
        ],
      },
    ]);

    render(await TanksPage());

    expect(screen.getByText("Living Room Display")).toBeInTheDocument();
    expect(screen.getByText("90 x 45 x 45 cm")).toBeInTheDocument();
    expect(screen.getByText("182 liters / 48.1 gallons")).toBeInTheDocument();
    expect(screen.getByText("Pacific Northwest")).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Pacific Northwest aquascape in an ADA 120P aquarium.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/forests of the pacific northwest/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/2 plants/i)).toBeInTheDocument();
    expect(screen.getByText(/1 fauna/i)).toBeInTheDocument();
    expect(screen.getByText(/1 fact/i)).toBeInTheDocument();
    expect(screen.getByText("1 tank")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete Tank" }),
    ).toBeInTheDocument();
  });

  it("renders an unavailable image state when the latest aquascape has no images", async () => {
    vi.mocked(listTanks).mockResolvedValue([
      {
        id: "tank-2",
        name: "Studio Display",
        lengthCm: 120,
        widthCm: 45,
        heightCm: 45,
        isPublic: true,
        userId: "user-1",
        createdAt: new Date("2026-03-25T12:00:00.000Z"),
        updatedAt: new Date("2026-03-25T12:00:00.000Z"),
        aquascapes: [
          {
            id: "scape-2",
            tankId: "tank-2",
            name: "School Garden",
            slug: "school-garden",
            description: "A school-inspired planted aquascape.",
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
      },
    ]);

    render(await TanksPage());

    expect(screen.getByText("Image not available yet")).toBeInTheDocument();
    expect(
      screen.queryByRole("img", {
        name: /school garden/i,
      }),
    ).not.toBeInTheDocument();
  });
});
