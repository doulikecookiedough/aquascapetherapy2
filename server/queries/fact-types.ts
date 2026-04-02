import { prisma } from "@/lib/db";

export async function listFactTypes() {
  return prisma.factType.findMany({
    orderBy: [
      {
        isSystem: "desc",
      },
      {
        name: "asc",
      },
    ],
  });
}
