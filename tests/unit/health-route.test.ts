import { describe, expect, it } from "vitest";

import { GET } from "../../app/api/health/route";

describe("GET /api/health", () => {
  it("returns a successful health payload", async () => {
    const response = GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      ok: true,
      service: "aquascape-therapy",
    });
  });
});
