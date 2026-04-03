import { z } from "zod";

export const createAquascapePlantSchema = z.object({
  aquascapeId: z.string().cuid("Aquascape id is invalid."),
  plantId: z.string().cuid("Plant is invalid."),
  notes: z
    .string()
    .trim()
    .max(160, "Plant notes must be 160 characters or fewer.")
    .nullable(),
});

const createAquascapePlantFormSchema = z.object({
  aquascapeId: z.string(),
  plantId: z.string(),
  notes: z.string(),
});

export type CreateAquascapePlantInput = z.infer<
  typeof createAquascapePlantSchema
>;

export function parseCreateAquascapePlantFormData(
  formData: FormData,
): CreateAquascapePlantInput {
  const rawInput = createAquascapePlantFormSchema.parse({
    aquascapeId: formData.get("aquascapeId"),
    plantId: formData.get("plantId"),
    notes: formData.get("notes"),
  });

  return createAquascapePlantSchema.parse({
    ...rawInput,
    notes: rawInput.notes.trim() ? rawInput.notes : null,
  });
}
