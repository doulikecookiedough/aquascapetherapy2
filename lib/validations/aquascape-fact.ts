import { z } from "zod";

export const createAquascapeFactSchema = z.object({
  aquascapeId: z.string().cuid("Aquascape id is invalid."),
  factTypeId: z.string().cuid("Fact type is invalid."),
  value: z
    .string()
    .trim()
    .min(1, "Fact value is required.")
    .max(200, "Fact value must be 200 characters or fewer."),
});

const createAquascapeFactFormSchema = z.object({
  aquascapeId: z.string(),
  factTypeId: z.string(),
  value: z.string(),
});

export type CreateAquascapeFactInput = z.infer<
  typeof createAquascapeFactSchema
>;

export function parseCreateAquascapeFactFormData(
  formData: FormData,
): CreateAquascapeFactInput {
  const rawInput = createAquascapeFactFormSchema.parse({
    aquascapeId: formData.get("aquascapeId"),
    factTypeId: formData.get("factTypeId"),
    value: formData.get("value"),
  });

  return createAquascapeFactSchema.parse(rawInput);
}
