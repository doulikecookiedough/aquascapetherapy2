import { z } from "zod";

export const createTankSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tank name is required.")
    .max(100, "Tank name must be 100 characters or fewer."),
  lengthCm: z
    .number()
    .int("Tank length must be a whole number.")
    .positive("Tank length must be greater than zero."),
  widthCm: z
    .number()
    .int("Tank width must be a whole number.")
    .positive("Tank width must be greater than zero."),
  heightCm: z
    .number()
    .int("Tank height must be a whole number.")
    .positive("Tank height must be greater than zero."),
});

const createTankFormSchema = z.object({
  name: z.string(),
  lengthCm: z.coerce.number(),
  widthCm: z.coerce.number(),
  heightCm: z.coerce.number(),
});

export type CreateTankInput = z.infer<typeof createTankSchema>;

export function parseCreateTankFormData(formData: FormData): CreateTankInput {
  const rawInput = createTankFormSchema.parse({
    name: formData.get("name"),
    lengthCm: formData.get("lengthCm"),
    widthCm: formData.get("widthCm"),
    heightCm: formData.get("heightCm"),
  });

  return createTankSchema.parse(rawInput);
}
