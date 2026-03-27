"use server";

import { revalidatePath } from "next/cache";

import { parseCreateTankFormData } from "@/lib/validations/tank";
import { createTank } from "@/server/mutations/tanks";

export async function createTankAction(formData: FormData) {
  const input = parseCreateTankFormData(formData);

  await createTank(input);
  revalidatePath("/tanks");
}
