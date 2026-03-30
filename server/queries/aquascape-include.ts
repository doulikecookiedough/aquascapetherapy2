export const aquascapeInclude = {
  images: {
    orderBy: [
      {
        isPrimary: "desc" as const,
      },
      {
        displayOrder: "asc" as const,
      },
    ],
  },
  equipment: {
    orderBy: {
      displayOrder: "asc" as const,
    },
  },
  plants: {
    include: {
      plant: true,
    },
    orderBy: {
      displayOrder: "asc" as const,
    },
  },
  fauna: {
    include: {
      fauna: true,
    },
    orderBy: {
      displayOrder: "asc" as const,
    },
  },
  facts: {
    include: {
      factType: true,
    },
    orderBy: {
      displayOrder: "asc" as const,
    },
  },
};
