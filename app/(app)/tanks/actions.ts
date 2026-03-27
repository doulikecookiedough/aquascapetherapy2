"use server";

import { revalidatePath } from "next/cache";

import {
  parseCreateTankFormData,
  parseDeleteTankFormData,
} from "@/lib/validations/tank";
import { createTank, deleteTank } from "@/server/mutations/tanks";

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
