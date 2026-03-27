import { z } from "zod";

export const createTankSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Tank name is required.")
    .max(100, "Tank name must be 100 characters or fewer."),
  volumeLiters: z
    .number()
    .int("Tank volume must be a whole number.")
    .positive("Tank volume must be greater than zero."),
  description: z
    .string()
    .trim()
    .max(500, "Description must be 500 characters or fewer.")
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
});

const createTankFormSchema = z.object({
  name: z.string(),
  volumeLiters: z.coerce.number(),
  description: z.string().optional(),
});

export type CreateTankInput = z.infer<typeof createTankSchema>;

export function parseCreateTankFormData(formData: FormData): CreateTankInput {
  const rawInput = createTankFormSchema.parse({
    name: formData.get("name"),
    volumeLiters: formData.get("volumeLiters"),
    description: formData.get("description"),
  });

  return createTankSchema.parse(rawInput);
}
