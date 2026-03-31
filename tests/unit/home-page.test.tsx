import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "../../app/(public)/page";

describe("Home page", () => {
  it("renders the project overview content", async () => {
    render(await Home());

    expect(
      screen.getByRole("heading", { name: "Aquarium Design Studio" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Public Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Aquascape Documentation")).toBeInTheDocument();
    expect(screen.getByText("Private Tracking")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "See Preview" }),
    ).toHaveAttribute("href", "/tanks");
    expect(screen.queryByText("Featured Aquarium")).not.toBeInTheDocument();
  });
});
