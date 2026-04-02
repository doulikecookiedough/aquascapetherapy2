"use server";

import { revalidatePath } from "next/cache";

import { parseCreateAquascapeImageFormData } from "@/lib/validations/aquascape-image";
import { createAquascapeImage } from "@/server/mutations/aquascape-images";

export async function createAquascapeImageAction(formData: FormData) {
  const input = parseCreateAquascapeImageFormData(formData);
  const result = await createAquascapeImage(input);

  revalidatePath("/tanks");
  revalidatePath(`/tanks/${result.tankId}`);
  revalidatePath(`/aquascapes/${result.slug}`);
}
