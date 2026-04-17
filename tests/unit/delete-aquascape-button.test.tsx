import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DeleteAquascapeButton } from "../../app/(public)/aquascapes/[slug]/delete-aquascape-button";

describe("DeleteAquascapeButton", () => {
  it("prevents submission when deletion is not confirmed", () => {
    const action = vi.fn();
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);

    render(<DeleteAquascapeButton aquascapeId="scape-1" action={action} />);

    const form = screen.getByRole("button", {
      name: "Delete Aquascape",
    }).closest("form");

    expect(form).not.toBeNull();

    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });

    form?.dispatchEvent(submitEvent);

    expect(confirmSpy).toHaveBeenCalledWith(
      "Delete this aquascape and all of its journal entries?",
    );
    expect(submitEvent.defaultPrevented).toBe(true);
  });
});
