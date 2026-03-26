import { execSync } from "node:child_process";

import { config } from "dotenv";

config({
  path: ".env.test",
  override: true,
});

execSync("npx prisma migrate deploy", {
  stdio: "inherit",
  env: process.env,
});
