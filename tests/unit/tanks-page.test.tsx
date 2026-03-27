import { render, screen } from "@testing-library/react";
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
    expect(screen.getByRole("heading", { name: "Add a Tank" })).toBeInTheDocument();
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
    expect(screen.getByRole("heading", { name: "Tank Inventory" })).toBeInTheDocument();
    expect(screen.getByText("No tanks yet")).toBeInTheDocument();
    expect(
      screen.getByText(/first database-backed page is now reading tank records/i),
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
            description:
              "An aquascape inspired by the forests of the pacific northwest.",
            isPublic: true,
            createdAt: new Date("2026-03-26T12:00:00.000Z"),
            updatedAt: new Date("2026-03-26T12:00:00.000Z"),
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
      screen.getByText(/forests of the pacific northwest/i),
    ).toBeInTheDocument();
    expect(screen.getByText("1 tank")).toBeInTheDocument();
  });
});
