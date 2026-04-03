import { z } from "zod";

export const createAquascapeFaunaSchema = z.object({
  aquascapeId: z.string().cuid("Aquascape id is invalid."),
  faunaId: z.string().cuid("Fauna is invalid."),
  notes: z
    .string()
    .trim()
    .max(160, "Fauna notes must be 160 characters or fewer.")
    .nullable(),
});

const createAquascapeFaunaFormSchema = z.object({
  aquascapeId: z.string(),
  faunaId: z.string(),
  notes: z.string(),
});

export type CreateAquascapeFaunaInput = z.infer<
  typeof createAquascapeFaunaSchema
>;

export function parseCreateAquascapeFaunaFormData(
  formData: FormData,
): CreateAquascapeFaunaInput {
  const rawInput = createAquascapeFaunaFormSchema.parse({
    aquascapeId: formData.get("aquascapeId"),
    faunaId: formData.get("faunaId"),
    notes: formData.get("notes"),
  });

  return createAquascapeFaunaSchema.parse({
    ...rawInput,
    notes: rawInput.notes.trim() ? rawInput.notes : null,
  });
}
