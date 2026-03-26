import { describe, expect, it } from "vitest";

import { createTankSchema } from "@/lib/validations/tank";

describe("createTankSchema", () => {
  it("accepts valid tank input", () => {
    const result = createTankSchema.parse({
      name: "Nature Style 90P",
      volumeLiters: 180,
      description: "A larger display aquarium.",
    });

    expect(result).toEqual({
      name: "Nature Style 90P",
      volumeLiters: 180,
      description: "A larger display aquarium.",
    });
  });

  it("normalizes an empty description to undefined", () => {
    const result = createTankSchema.parse({
      name: "Nano Forest",
      volumeLiters: 45,
      description: "   ",
    });

    expect(result.description).toBeUndefined();
  });

  it("rejects invalid tank input", () => {
    const result = createTankSchema.safeParse({
      name: "",
      volumeLiters: 0,
      description: "x".repeat(501),
    });

    expect(result.success).toBe(false);
  });
});
