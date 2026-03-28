import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Home from "../../app/(public)/page";
import { listTanks } from "../../server/queries/tanks";

vi.mock("../../server/queries/tanks", () => ({
  listTanks: vi.fn(),
}));

describe("Home page", () => {
  beforeEach(() => {
    vi.mocked(listTanks).mockReset();
  });

  it("renders the project overview content", async () => {
    vi.mocked(listTanks).mockResolvedValue([
      {
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
            name: "Pacific Northwest",
            slug: "pacific-northwest",
            description:
              "An aquascape inspired by the forests of the Pacific Northwest.",
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
            equipment: [],
            plants: [],
            fauna: [],
            facts: [],
          },
        ],
      },
    ]);

    render(await Home());

    expect(
      screen.getByRole("heading", { name: "Aquarium Design Studio" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Public Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Aquascape Documentation")).toBeInTheDocument();
    expect(screen.getByText("Private Tracking")).toBeInTheDocument();
    expect(screen.getByText("Featured Aquarium")).toBeInTheDocument();
    expect(screen.getByText("ADA 120P")).toBeInTheDocument();
    expect(
      screen.getByText(/latest aquascape:\s*pacific northwest/i),
    ).toBeInTheDocument();
  });
});
