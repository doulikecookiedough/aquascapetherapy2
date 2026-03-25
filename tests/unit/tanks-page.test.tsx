import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import TanksPage from "../../app/(app)/tanks/page";

describe("Tanks page", () => {
  it("renders the first app milestone message", () => {
    render(<TanksPage />);

    expect(
      screen.getByRole("heading", { name: "Tanks" }),
    ).toBeInTheDocument();
    expect(screen.getByText("App")).toBeInTheDocument();
    expect(
      screen.getByText(/first database-backed feature in the app/i),
    ).toBeInTheDocument();
  });
});
