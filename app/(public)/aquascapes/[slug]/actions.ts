"use server";

import { revalidatePath } from "next/cache";

import { parseCreateAquascapeEquipmentFormData } from "@/lib/validations/aquascape-equipment";
import { parseCreateAquascapeFactFormData } from "@/lib/validations/aquascape-fact";
import { parseCreateAquascapeImageFormData } from "@/lib/validations/aquascape-image";
import { parseCreateAquascapePlantFormData } from "@/lib/validations/aquascape-plant";
import { createAquascapeEquipment } from "@/server/mutations/aquascape-equipment";
import { createAquascapeFact } from "@/server/mutations/aquascape-facts";
import { createAquascapeImage } from "@/server/mutations/aquascape-images";
import { createAquascapePlant } from "@/server/mutations/aquascape-plants";

export async function createAquascapeEquipmentAction(formData: FormData) {
  const input = parseCreateAquascapeEquipmentFormData(formData);
  const result = await createAquascapeEquipment(input);

  revalidatePath("/tanks");
  revalidatePath(`/tanks/${result.tankId}`);
  revalidatePath(`/aquascapes/${result.slug}`);
}

export async function createAquascapeFactAction(formData: FormData) {
  const input = parseCreateAquascapeFactFormData(formData);
  const result = await createAquascapeFact(input);

  revalidatePath("/tanks");
  revalidatePath(`/tanks/${result.tankId}`);
  revalidatePath(`/aquascapes/${result.slug}`);
}

export async function createAquascapePlantAction(formData: FormData) {
  const input = parseCreateAquascapePlantFormData(formData);
  const result = await createAquascapePlant(input);

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
