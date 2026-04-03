import { config } from "dotenv";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach } from "vitest";
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) =>
    React.createElement("img", {
      alt,
      src,
      ...props,
    }),
}));

afterEach(() => {
  cleanup();
});

config({
  path: ".env.test",
  override: true,
});
