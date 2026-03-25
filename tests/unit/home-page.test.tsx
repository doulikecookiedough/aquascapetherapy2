import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "../../app/(public)/page";

describe("Home page", () => {
  it("renders the project overview content", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Aquascape Therapy" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Public Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Private Tracking App")).toBeInTheDocument();
    expect(screen.getByText("Learning Goal")).toBeInTheDocument();
  });
});
