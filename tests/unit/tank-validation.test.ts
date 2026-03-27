import { describe, expect, it } from "vitest";

import {
  createTankSchema,
  deleteTankSchema,
  parseCreateTankFormData,
  parseDeleteTankFormData,
} from "@/lib/validations/tank";

describe("createTankSchema", () => {
  it("accepts valid tank input", () => {
    const result = createTankSchema.parse({
      name: "Living Room Display",
      lengthCm: 90,
      widthCm: 45,
      heightCm: 45,
    });

    expect(result).toEqual({
      name: "Living Room Display",
      lengthCm: 90,
      widthCm: 45,
      heightCm: 45,
    });
  });

  it("rejects invalid tank input", () => {
    const result = createTankSchema.safeParse({
      name: "",
      lengthCm: 0,
      widthCm: 0,
      heightCm: 0,
    });

    expect(result.success).toBe(false);
  });

  it("parses form data into typed tank input", () => {
    const formData = new FormData();
    formData.set("name", "Living Room Display");
    formData.set("lengthCm", "90");
    formData.set("widthCm", "45");
    formData.set("heightCm", "45");

    const result = parseCreateTankFormData(formData);

    expect(result).toEqual({
      name: "Living Room Display",
      lengthCm: 90,
      widthCm: 45,
      heightCm: 45,
    });
  });

  it("parses delete form data into typed tank input", () => {
    const formData = new FormData();
    formData.set("tankId", "cmn8go9fi00029wb60rph3r71");

    const result = parseDeleteTankFormData(formData);

    expect(result).toEqual({
      tankId: "cmn8go9fi00029wb60rph3r71",
    });
  });
});

describe("deleteTankSchema", () => {
  it("rejects an invalid tank id", () => {
    const result = deleteTankSchema.safeParse({
      tankId: "not-a-cuid",
    });

    expect(result.success).toBe(false);
  });
});
