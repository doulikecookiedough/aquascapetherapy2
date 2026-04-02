import { prisma } from "@/lib/db";

export async function listFactTypes() {
  return prisma.factType.findMany({
    orderBy: [
      {
        isRepeatable: "desc",
      },
      {
        isSystem: "desc",
      },
      {
        name: "asc",
      },
    ],
  });
}
