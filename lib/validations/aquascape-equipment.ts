import { z } from "zod";

import { EquipmentCategory } from "@/prisma/generated/enums";

export const createAquascapeEquipmentSchema = z.object({
  aquascapeId: z.string().cuid("Aquascape id is invalid."),
  category: z.nativeEnum(EquipmentCategory),
  name: z
    .string()
    .trim()
    .min(1, "Equipment name is required.")
    .max(100, "Equipment name must be 100 characters or fewer."),
  details: z
    .string()
    .trim()
    .max(120, "Equipment details must be 120 characters or fewer.")
    .nullable(),
});

const createAquascapeEquipmentFormSchema = z.object({
  aquascapeId: z.string(),
  category: z.string(),
  name: z.string(),
  details: z.string(),
});

export type CreateAquascapeEquipmentInput = z.infer<
  typeof createAquascapeEquipmentSchema
>;

export function parseCreateAquascapeEquipmentFormData(
  formData: FormData,
): CreateAquascapeEquipmentInput {
  const rawInput = createAquascapeEquipmentFormSchema.parse({
    aquascapeId: formData.get("aquascapeId"),
    category: formData.get("category"),
    name: formData.get("name"),
    details: formData.get("details"),
  });

  return createAquascapeEquipmentSchema.parse({
    ...rawInput,
    details: rawInput.details.trim() ? rawInput.details : null,
  });
}
