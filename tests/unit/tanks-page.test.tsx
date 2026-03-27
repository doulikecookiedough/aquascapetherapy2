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
      screen.getByRole("spinbutton", { name: "Volume (Liters)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Description" }),
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
        name: "Nature Style 90P",
        volumeLiters: 180,
        description: "A larger display aquarium.",
        createdAt: new Date("2026-03-25T12:00:00.000Z"),
        updatedAt: new Date("2026-03-25T12:00:00.000Z"),
      },
    ]);

    render(await TanksPage());

    expect(screen.getByText("Nature Style 90P")).toBeInTheDocument();
    expect(screen.getByText("180 liters")).toBeInTheDocument();
    expect(screen.getByText("A larger display aquarium.")).toBeInTheDocument();
    expect(screen.getByText("1 tank")).toBeInTheDocument();
  });
});
