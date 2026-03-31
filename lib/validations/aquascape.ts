import { z } from "zod";

import { AquascapeStatus } from "@/prisma/generated/enums";

export const createAquascapeSchema = z.object({
  tankId: z.string().cuid("Tank id is invalid."),
  name: z
    .string()
    .trim()
    .min(1, "Aquascape name is required.")
    .max(100, "Aquascape name must be 100 characters or fewer."),
  slug: z
    .string()
    .trim()
    .min(1, "Aquascape slug is required.")
    .max(100, "Aquascape slug must be 100 characters or fewer.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Aquascape slug must use lowercase letters, numbers, and hyphens only.",
    ),
  description: z
    .string()
    .trim()
    .max(2000, "Aquascape description must be 2000 characters or fewer.")
    .nullable(),
  status: z.nativeEnum(AquascapeStatus),
});

const createAquascapeFormSchema = z.object({
  tankId: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  status: z.string(),
});

export type CreateAquascapeInput = z.infer<typeof createAquascapeSchema>;

export function parseCreateAquascapeFormData(
  formData: FormData,
): CreateAquascapeInput {
  const rawInput = createAquascapeFormSchema.parse({
    tankId: formData.get("tankId"),
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    status: formData.get("status"),
  });

  return createAquascapeSchema.parse({
    ...rawInput,
    description: rawInput.description.trim() === "" ? null : rawInput.description,
  });
}
