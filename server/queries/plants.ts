import { prisma } from "@/lib/db";

export async function listPlants() {
  return prisma.plant.findMany({
    orderBy: {
      name: "asc",
    },
  });
}
