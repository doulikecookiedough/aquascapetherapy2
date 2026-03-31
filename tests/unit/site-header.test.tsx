import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "../../app/site-header";

describe("SiteHeader", () => {
  it("renders the primary site navigation", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: "Aquarium Design Studio" }),
    ).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(
      screen.getByRole("link", { name: "My Portfolio" }),
    ).toHaveAttribute("href", "/tanks");
  });
});
