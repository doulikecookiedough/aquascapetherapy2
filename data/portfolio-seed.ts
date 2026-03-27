export type PortfolioAquascapeSeed = {
  name: string;
  slug: string;
  description: string | null;
  isPublic: boolean;
  status: "DRAFT" | "PENDING_REVIEW" | "APPROVED" | "REJECTED";
  images: Array<{
    src: string;
    alt: string;
    displayOrder: number;
    isPrimary: boolean;
  }>;
  equipment: Array<{
    category:
      | "TANK"
      | "LIGHTING"
      | "FILTER"
      | "CO2"
      | "HEATING"
      | "SUBSTRATE"
      | "FERTILIZER"
      | "OTHER";
    name: string;
    details?: string;
    displayOrder: number;
  }>;
  plants: Array<{
    name: string;
    slug: string;
    scientificName?: string;
    commonName?: string;
    description?: string;
    displayOrder: number;
    notes?: string;
  }>;
  fauna: Array<{
    name: string;
    slug: string;
    description?: string;
    displayOrder: number;
    notes?: string;
  }>;
  facts: Array<{
    name: string;
    slug: string;
    unit?: string;
    isSystem: boolean;
    value: string;
    displayOrder: number;
  }>;
};

export type PortfolioTankSeed = {
  name: string;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  isPublic: boolean;
  aquascapes: PortfolioAquascapeSeed[];
};

export const portfolioOwnerProfile = {
  email: "dou@portfolio.local",
  firstName: "Dou",
  lastName: "Mok",
  bio: null,
};

export const portfolioSeedTanks: PortfolioTankSeed[] = [
  {
    name: "ADA 150P",
    lengthCm: 150,
    widthCm: 60,
    heightCm: 60,
    isPublic: true,
    aquascapes: [],
  },
  {
    name: "ADA 120P",
    lengthCm: 120,
    widthCm: 45,
    heightCm: 45,
    isPublic: true,
    aquascapes: [
      {
        name: "Pacific Northwest",
        slug: "pacific-northwest",
        description:
          "An aquascape inspired by the forests of the Pacific Northwest.",
        isPublic: true,
        status: "APPROVED",
        images: [
          {
            src: "https://raw.githubusercontent.com/doulikecookiedough/aquascapetherapy/main/src/components/Aquascapes/Assets/120P_PacificNorthwest.jpg",
            alt: "Pacific Northwest aquascape in an ADA 120P aquarium.",
            displayOrder: 0,
            isPrimary: true,
          },
        ],
        equipment: [
          {
            category: "TANK",
            name: "ADA 120P",
            displayOrder: 0,
          },
          {
            category: "LIGHTING",
            name: "ADA Solar RGB",
            details: "x2",
            displayOrder: 1,
          },
          {
            category: "FILTER",
            name: "EHEIM Classic 2215",
            details: "x2",
            displayOrder: 2,
          },
        ],
        plants: [
          { name: "Java Fern", slug: "java-fern", displayOrder: 0 },
          {
            name: "Java Fern Narrow",
            slug: "java-fern-narrow",
            displayOrder: 1,
          },
          {
            name: "Java Fern Windelov",
            slug: "java-fern-windelov",
            displayOrder: 2,
          },
          {
            name: "Java Fern Trident",
            slug: "java-fern-trident",
            displayOrder: 3,
          },
          { name: "Java Fern Red", slug: "java-fern-red", displayOrder: 4 },
          {
            name: "Java Fern Sunset",
            slug: "java-fern-sunset",
            displayOrder: 5,
          },
          { name: "Anubias Pinto", slug: "anubias-pinto", displayOrder: 6 },
          { name: "Anubias Petite", slug: "anubias-petite", displayOrder: 7 },
          {
            name: "Riccardia Chamedryfolia",
            slug: "riccardia-chamedryfolia",
            displayOrder: 8,
          },
          {
            name: "Bucephalandra Various Sp.",
            slug: "bucephalandra-various-sp",
            displayOrder: 9,
          },
          {
            name: "Bolbitis Heudelotii",
            slug: "bolbitis-heudelotii",
            displayOrder: 10,
          },
          { name: "Crypt Parva", slug: "crypt-parva", displayOrder: 11 },
          {
            name: "Crypt Wendtii Brown Mini",
            slug: "crypt-wendtii-brown-mini",
            displayOrder: 12,
          },
          {
            name: "Crypt Albida Brown",
            slug: "crypt-albida-brown",
            displayOrder: 13,
          },
          {
            name: "Glossostigma Elatinoides",
            slug: "glossostigma-elatinoides",
            displayOrder: 14,
          },
        ],
        fauna: [
          {
            name: "Norman's Lampeye Killifish",
            slug: "normans-lampeye-killifish",
            displayOrder: 0,
          },
          {
            name: "Somphongsi Rasbora",
            slug: "somphongsi-rasbora",
            displayOrder: 1,
          },
          {
            name: "Pygmy Corydora",
            slug: "pygmy-corydora",
            displayOrder: 2,
          },
          {
            name: "Otocinclus Catfish",
            slug: "otocinclus-catfish",
            displayOrder: 3,
          },
          {
            name: "Cherry Shrimp",
            slug: "cherry-shrimp",
            displayOrder: 4,
          },
          {
            name: "Ramshorn Snails",
            slug: "ramshorn-snails",
            displayOrder: 5,
          },
        ],
        facts: [
          {
            name: "Hardscape 1",
            slug: "hardscape-1",
            isSystem: true,
            value: "Manzanita Wood",
            displayOrder: 0,
          },
          {
            name: "Hardscape 2",
            slug: "hardscape-2",
            isSystem: true,
            value: "ADA Yamaya Stone",
            displayOrder: 1,
          },
          {
            name: "Substrate 1",
            slug: "substrate-1",
            isSystem: true,
            value: "ADA Amazonia",
            displayOrder: 2,
          },
          {
            name: "Substrate 2",
            slug: "substrate-2",
            isSystem: true,
            value: "Pea Gravel",
            displayOrder: 3,
          },
          {
            name: "Light Period",
            slug: "light-period",
            isSystem: true,
            value: "7 Hours",
            displayOrder: 4,
          },
          {
            name: "CO2",
            slug: "co2",
            isSystem: true,
            value: "5-6 BPS, 5 Hours",
            displayOrder: 5,
          },
          {
            name: "Temperature",
            slug: "temperature",
            unit: "C",
            isSystem: true,
            value: "22",
            displayOrder: 6,
          },
          {
            name: "Water Change",
            slug: "water-change",
            isSystem: true,
            value: "25%, 2 per week",
            displayOrder: 7,
          },
          {
            name: "TDS",
            slug: "tds",
            isSystem: true,
            value: "175",
            displayOrder: 8,
          },
        ],
      },
    ],
  },
];
