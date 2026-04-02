import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { notFound } = vi.hoisted(() => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("next/navigation", () => ({
  notFound,
}));

import AquascapeDetailPage from "../../app/(public)/aquascapes/[slug]/page";
import { getAquascapeBySlug } from "../../server/queries/aquascapes";
import { listFactTypes } from "../../server/queries/fact-types";

vi.mock("../../server/queries/aquascapes", () => ({
  getAquascapeBySlug: vi.fn(),
}));

vi.mock("../../server/queries/fact-types", () => ({
  listFactTypes: vi.fn(),
}));

describe("Aquascape detail page", () => {
  beforeEach(() => {
    vi.mocked(getAquascapeBySlug).mockReset();
    vi.mocked(listFactTypes).mockReset();
    notFound.mockClear();
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
            isRepeatable: false,
            createdAt: new Date("2026-03-28T12:00:00.000Z"),
            updatedAt: new Date("2026-03-28T12:00:00.000Z"),
          },
        },
      ],
    });
    vi.mocked(listFactTypes).mockResolvedValue([
      {
        id: "fact-type-1",
        name: "Light Period",
        slug: "light-period",
        unit: null,
        isSystem: true,
        isRepeatable: false,
        createdAt: new Date("2026-03-28T12:00:00.000Z"),
        updatedAt: new Date("2026-03-28T12:00:00.000Z"),
      },
      {
        id: "fact-type-2",
        name: "Temperature",
        slug: "temperature",
        unit: "C",
        isSystem: true,
        isRepeatable: false,
        createdAt: new Date("2026-03-28T12:00:00.000Z"),
        updatedAt: new Date("2026-03-28T12:00:00.000Z"),
      },
    ]);

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
    expect(
      screen.getByRole("button", { name: "Add Image" }),
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

    fireEvent.click(screen.getByRole("button", { name: "Add Image" }));

    expect(screen.getByRole("textbox", { name: "Image URL" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Alt Text" })).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", { name: "Mark as primary image" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save Image" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Add Fact" }));

    expect(screen.getByRole("combobox", { name: "Fact Type" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Value" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Save Fact" }),
    ).toBeInTheDocument();
  });

  it("numbers repeatable facts by occurrence in the journal view", async () => {
    vi.mocked(getAquascapeBySlug).mockResolvedValue({
      id: "scape-repeatable",
      tankId: "tank-1",
      name: "Repeatable Layout",
      slug: "repeatable-layout",
      description: null,
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
      images: [],
      equipment: [],
      plants: [],
      fauna: [],
      facts: [
        {
          id: "fact-1",
          aquascapeId: "scape-repeatable",
          factTypeId: "fact-type-hardscape",
          value: "Manzanita Wood",
          displayOrder: 0,
          createdAt: new Date("2026-03-28T12:00:00.000Z"),
          updatedAt: new Date("2026-03-28T12:00:00.000Z"),
          factType: {
            id: "fact-type-hardscape",
            name: "Hardscape",
            slug: "hardscape",
            unit: null,
            isSystem: false,
            isRepeatable: true,
            createdAt: new Date("2026-03-28T12:00:00.000Z"),
            updatedAt: new Date("2026-03-28T12:00:00.000Z"),
          },
        },
        {
          id: "fact-2",
          aquascapeId: "scape-repeatable",
          factTypeId: "fact-type-hardscape",
          value: "ADA Yamaya Stone",
          displayOrder: 1,
          createdAt: new Date("2026-03-28T12:00:00.000Z"),
          updatedAt: new Date("2026-03-28T12:00:00.000Z"),
          factType: {
            id: "fact-type-hardscape",
            name: "Hardscape",
            slug: "hardscape",
            unit: null,
            isSystem: false,
            isRepeatable: true,
            createdAt: new Date("2026-03-28T12:00:00.000Z"),
            updatedAt: new Date("2026-03-28T12:00:00.000Z"),
          },
        },
      ],
    });
    vi.mocked(listFactTypes).mockResolvedValue([]);

    render(
      await AquascapeDetailPage({
        params: Promise.resolve({ slug: "repeatable-layout" }),
      }),
    );

    expect(screen.getByText("Hardscape 1")).toBeInTheDocument();
    expect(screen.getByText("Hardscape 2")).toBeInTheDocument();
    expect(
      screen.getByText((_, element) =>
        element?.textContent === "Hardscape 1: Manzanita Wood",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText((_, element) =>
        element?.textContent === "Hardscape 2: ADA Yamaya Stone",
      ),
    ).toBeInTheDocument();
  });

  it("renders an unavailable image state when the aquascape has no images", async () => {
    vi.mocked(getAquascapeBySlug).mockResolvedValue({
      id: "scape-2",
      tankId: "tank-1",
      name: "School Garden",
      slug: "school-garden",
      description: "A school-inspired planted aquascape.",
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
      images: [],
      equipment: [],
      plants: [],
      fauna: [],
      facts: [],
    });
    vi.mocked(listFactTypes).mockResolvedValue([]);

    render(
      await AquascapeDetailPage({
        params: Promise.resolve({ slug: "school-garden" }),
      }),
    );

    expect(screen.getByText("Image not available yet")).toBeInTheDocument();
    expect(
      screen.queryByRole("img", {
        name: /school garden/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("calls notFound when the aquascape slug is invalid", async () => {
    vi.mocked(getAquascapeBySlug).mockResolvedValue(null);
    vi.mocked(listFactTypes).mockResolvedValue([]);

    await expect(
      AquascapeDetailPage({
        params: Promise.resolve({ slug: "missing-slug" }),
      }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
