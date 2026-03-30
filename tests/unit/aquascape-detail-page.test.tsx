import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import AquascapeDetailPage from "../../app/(public)/aquascapes/[slug]/page";
import { getAquascapeBySlug } from "../../server/queries/aquascapes";

vi.mock("../../server/queries/aquascapes", () => ({
  getAquascapeBySlug: vi.fn(),
}));

describe("Aquascape detail page", () => {
  beforeEach(() => {
    vi.mocked(getAquascapeBySlug).mockReset();
  });

  it("renders the aquascape journal with images, equipment, facts, plants, and fauna", async () => {
    vi.mocked(getAquascapeBySlug).mockResolvedValue({
      id: "scape-1",
      tankId: "tank-1",
      name: "Pacific Northwest",
      slug: "pacific-northwest",
      description: "An aquascape inspired by the forests of the Pacific Northwest.",
      isPublic: true,
      status: "APPROVED",
      createdAt: new Date("2026-03-28T12:00:00.000Z"),
      updatedAt: new Date("2026-03-28T12:00:00.000Z"),
      tank: {
        id: "tank-1",
        name: "ADA 120P",
        lengthCm: 120,
        widthCm: 45,
        heightCm: 45,
        isPublic: true,
        userId: "user-1",
        createdAt: new Date("2026-03-25T12:00:00.000Z"),
        updatedAt: new Date("2026-03-25T12:00:00.000Z"),
      },
      images: [
        {
          id: "image-1",
          aquascapeId: "scape-1",
          src: "https://example.com/pacific-northwest.jpg",
          alt: "Pacific Northwest aquascape in an ADA 120P aquarium.",
          displayOrder: 0,
          isPrimary: true,
          createdAt: new Date("2026-03-28T12:00:00.000Z"),
          updatedAt: new Date("2026-03-28T12:00:00.000Z"),
        },
        {
          id: "image-2",
          aquascapeId: "scape-1",
          src: "https://example.com/pacific-northwest-detail.jpg",
          alt: "Detail image of Pacific Northwest hardscape.",
          displayOrder: 1,
          isPrimary: false,
          createdAt: new Date("2026-03-28T12:00:00.000Z"),
          updatedAt: new Date("2026-03-28T12:00:00.000Z"),
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
          createdAt: new Date("2026-03-28T12:00:00.000Z"),
          updatedAt: new Date("2026-03-28T12:00:00.000Z"),
        },
      ],
      plants: [
        {
          id: "plant-link-1",
          aquascapeId: "scape-1",
          plantId: "plant-1",
          displayOrder: 0,
          notes: null,
          createdAt: new Date("2026-03-28T12:00:00.000Z"),
          updatedAt: new Date("2026-03-28T12:00:00.000Z"),
          plant: {
            id: "plant-1",
            name: "Java Fern",
            slug: "java-fern",
            scientificName: null,
            commonName: null,
            description: null,
            createdAt: new Date("2026-03-28T12:00:00.000Z"),
            updatedAt: new Date("2026-03-28T12:00:00.000Z"),
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
          createdAt: new Date("2026-03-28T12:00:00.000Z"),
          updatedAt: new Date("2026-03-28T12:00:00.000Z"),
          fauna: {
            id: "fauna-1",
            name: "Cherry Shrimp",
            slug: "cherry-shrimp",
            description: null,
            createdAt: new Date("2026-03-28T12:00:00.000Z"),
            updatedAt: new Date("2026-03-28T12:00:00.000Z"),
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
          createdAt: new Date("2026-03-28T12:00:00.000Z"),
          updatedAt: new Date("2026-03-28T12:00:00.000Z"),
          factType: {
            id: "fact-type-1",
            name: "Light Period",
            slug: "light-period",
            unit: null,
            isSystem: true,
            createdAt: new Date("2026-03-28T12:00:00.000Z"),
            updatedAt: new Date("2026-03-28T12:00:00.000Z"),
          },
        },
      ],
    });

    render(
      await AquascapeDetailPage({
        params: Promise.resolve({ slug: "pacific-northwest" }),
      }),
    );

    expect(
      screen.getByRole("link", { name: /back to ada 120p/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Pacific Northwest" }),
    ).toBeInTheDocument();
    expect(screen.getByText("ADA 120P")).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Pacific Northwest aquascape in an ADA 120P aquarium.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "Detail image of Pacific Northwest hardscape.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Equipment")).toBeInTheDocument();
    expect(screen.getByText(/ADA Solar RGB/i)).toBeInTheDocument();
    expect(screen.getByText("Facts")).toBeInTheDocument();
    expect(screen.getByText(/Light Period/)).toBeInTheDocument();
    expect(screen.getByText("Plants")).toBeInTheDocument();
    expect(screen.getByText("Java Fern")).toBeInTheDocument();
    expect(screen.getByText("Fauna")).toBeInTheDocument();
    expect(screen.getByText("Cherry Shrimp")).toBeInTheDocument();
  });
});
