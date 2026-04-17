import { beforeEach, describe, expect, it, vi } from "vitest";

const { revalidatePath, redirect } = vi.hoisted(() => ({
  revalidatePath: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath,
}));

vi.mock("next/navigation", () => ({
  redirect,
}));

import { deleteAquascapeAction } from "../../app/(public)/aquascapes/[slug]/actions";
import { deleteAquascape } from "../../server/mutations/aquascapes";

vi.mock("../../server/mutations/aquascapes", () => ({
  deleteAquascape: vi.fn(),
}));

describe("aquascape actions", () => {
  beforeEach(() => {
    vi.mocked(deleteAquascape).mockReset();
    revalidatePath.mockReset();
    redirect.mockReset();
  });

  it("revalidates tank pages and redirects to the parent tank after deletion", async () => {
    vi.mocked(deleteAquascape).mockResolvedValue({
      tankId: "tank-1",
    });

    const formData = new FormData();
    formData.set("aquascapeId", "cm9deletedscape0001abc12345");

    await deleteAquascapeAction(formData);

    expect(deleteAquascape).toHaveBeenCalledWith({
      aquascapeId: "cm9deletedscape0001abc12345",
    });
    expect(revalidatePath).toHaveBeenCalledTimes(2);
    expect(revalidatePath).toHaveBeenNthCalledWith(1, "/tanks");
    expect(revalidatePath).toHaveBeenNthCalledWith(2, "/tanks/tank-1");
    expect(redirect).toHaveBeenCalledWith("/tanks/tank-1");
  });

  it("does not revalidate or redirect when deletion fails", async () => {
    vi.mocked(deleteAquascape).mockRejectedValue(new Error("Aquascape not found."));

    const formData = new FormData();
    formData.set("aquascapeId", "cm9missing0001abc123456789");

    await expect(deleteAquascapeAction(formData)).rejects.toThrow(
      "Aquascape not found.",
    );

    expect(revalidatePath).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });
});
