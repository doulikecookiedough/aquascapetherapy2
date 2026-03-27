import { defineConfig, mergeConfig } from "vitest/config";

import baseConfig from "./vitest.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      include: ["./tests/unit/**/*.test.{ts,tsx}"],
      environment: "jsdom",
      setupFiles: ["./tests/setup.unit.ts"],
    },
  }),
);
