import { z } from "zod";

export const createAquascapeImageSchema = z.object({
  aquascapeId: z.string().cuid("Aquascape id is invalid."),
  src: z.url("Image URL must be a valid URL."),
  alt: z
    .string()
    .trim()
    .min(1, "Image alt text is required.")
    .max(200, "Image alt text must be 200 characters or fewer."),
  isPrimary: z.boolean(),
});

const createAquascapeImageFormSchema = z.object({
  aquascapeId: z.string(),
  src: z.string(),
  alt: z.string(),
  isPrimary: z.string().nullable(),
});

export type CreateAquascapeImageInput = z.infer<
  typeof createAquascapeImageSchema
>;

export function parseCreateAquascapeImageFormData(
  formData: FormData,
): CreateAquascapeImageInput {
  const rawInput = createAquascapeImageFormSchema.parse({
    aquascapeId: formData.get("aquascapeId"),
    src: formData.get("src"),
    alt: formData.get("alt"),
    isPrimary: formData.get("isPrimary"),
  });

  return createAquascapeImageSchema.parse({
    aquascapeId: rawInput.aquascapeId,
    src: rawInput.src.trim(),
    alt: rawInput.alt,
    isPrimary: rawInput.isPrimary === "on",
  });
}
