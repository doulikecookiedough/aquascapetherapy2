"use server";

import { revalidatePath } from "next/cache";

import { parseCreateAquascapeFactFormData } from "@/lib/validations/aquascape-fact";
import { parseCreateAquascapeImageFormData } from "@/lib/validations/aquascape-image";
import { createAquascapeFact } from "@/server/mutations/aquascape-facts";
import { createAquascapeImage } from "@/server/mutations/aquascape-images";

export async function createAquascapeFactAction(formData: FormData) {
  const input = parseCreateAquascapeFactFormData(formData);
  const result = await createAquascapeFact(input);

  revalidatePath("/tanks");
  revalidatePath(`/tanks/${result.tankId}`);
  revalidatePath(`/aquascapes/${result.slug}`);
}

export async function createAquascapeImageAction(formData: FormData) {
  const input = parseCreateAquascapeImageFormData(formData);
  const result = await createAquascapeImage(input);

  revalidatePath("/tanks");
  revalidatePath(`/tanks/${result.tankId}`);
  revalidatePath(`/aquascapes/${result.slug}`);
}
