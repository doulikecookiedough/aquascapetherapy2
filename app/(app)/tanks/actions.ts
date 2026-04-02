"use server";

import { revalidatePath } from "next/cache";

import { parseCreateAquascapeFormData } from "@/lib/validations/aquascape";
import { createAquascape } from "@/server/mutations/aquascapes";
import {
  parseCreateTankFormData,
  parseDeleteTankFormData,
} from "@/lib/validations/tank";
import { createTank, deleteTank } from "@/server/mutations/tanks";

export async function createAquascapeAction(formData: FormData) {
  const input = parseCreateAquascapeFormData(formData);

  await createAquascape(input);
  revalidatePath("/tanks");
  revalidatePath(`/tanks/${input.tankId}`);
}

export async function createTankAction(formData: FormData) {
  const input = parseCreateTankFormData(formData);

  await createTank(input);
  revalidatePath("/tanks");
}

export async function deleteTankAction(formData: FormData) {
  const input = parseDeleteTankFormData(formData);

  await deleteTank(input);
  revalidatePath("/tanks");
}
