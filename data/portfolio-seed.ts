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
    aquascapes: [
      {
        name: "Nana's Pass",
        slug: "nanas-pass",
        description: "A large-format aquascape created in an ADA 150P aquarium.",
        isPublic: true,
        status: "APPROVED",
        images: [
          {
            src: "https://raw.githubusercontent.com/doulikecookiedough/aquascapetherapy/main/src/components/Aquascapes/Assets/150P_NanasPass.jpg",
            alt: "Nanas Pass aquascape in an ADA 150P aquarium.",
            displayOrder: 0,
            isPrimary: true,
          },
        ],
        equipment: [
          {
            category: "TANK",
            name: "ADA 150P",
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
            name: "Oase Biomaster 850",
            details: "x4",
            displayOrder: 2,
          },
        ],
        plants: [
          {
            name: "Bolbitis Heudelotii",
            slug: "bolbitis-heudelotii",
            displayOrder: 0,
          },
          { name: "Anubias Nana", slug: "anubias-nana", displayOrder: 1 },
          {
            name: "Anubias Nana Variegated",
            slug: "anubias-nana-variegated",
            displayOrder: 2,
          },
          { name: "Anubias Petite", slug: "anubias-petite", displayOrder: 3 },
          {
            name: "Java Fern Needle Leaf",
            slug: "java-fern-needle-leaf",
            displayOrder: 4,
          },
          { name: "Java Fern Red", slug: "java-fern-red", displayOrder: 5 },
          {
            name: "Java Fern Narrow",
            slug: "java-fern-narrow",
            displayOrder: 6,
          },
          {
            name: "Riccardia Chamedryfolia",
            slug: "riccardia-chamedryfolia",
            displayOrder: 7,
          },
          { name: "Java Moss", slug: "java-moss", displayOrder: 8 },
          {
            name: "Nymphaea Stellata",
            slug: "nymphaea-stellata",
            displayOrder: 9,
          },
        ],
        fauna: [
          {
            name: "Rio Nanay Peru Altum Angel",
            slug: "rio-nanay-peru-altum-angel",
            displayOrder: 0,
          },
          {
            name: "Silver Flying Fox",
            slug: "silver-flying-fox",
            displayOrder: 1,
          },
          {
            name: "Otocinclus Catfish",
            slug: "otocinclus-catfish",
            displayOrder: 2,
          },
          {
            name: "Amano Shrimp",
            slug: "amano-shrimp",
            displayOrder: 3,
          },
          {
            name: "Ramshorn Snails",
            slug: "ramshorn-snails",
            displayOrder: 4,
          },
        ],
        facts: [
          {
            name: "Hardscape 1",
            slug: "hardscape-1",
            isSystem: false,
            value: "Manzanita Wood",
            displayOrder: 0,
          },
          {
            name: "Hardscape 2",
            slug: "hardscape-2",
            isSystem: false,
            value: "ADA Yamaya Stone",
            displayOrder: 1,
          },
          {
            name: "Substrate 1",
            slug: "substrate-1",
            isSystem: false,
            value: "ADA Amazonia",
            displayOrder: 2,
          },
          {
            name: "Substrate 2",
            slug: "substrate-2",
            isSystem: false,
            value: "ADA La Plata",
            displayOrder: 3,
          },
          {
            name: "Substrate 3",
            slug: "substrate-3",
            isSystem: false,
            value: "DOOA River Sand",
            displayOrder: 4,
          },
          {
            name: "Light Period",
            slug: "light-period",
            isSystem: true,
            value: "7 Hours",
            displayOrder: 5,
          },
          {
            name: "CO2",
            slug: "co2",
            isSystem: true,
            value: "5-6 BPS, 5 Hours",
            displayOrder: 6,
          },
          {
            name: "Temperature",
            slug: "temperature",
            unit: "C",
            isSystem: true,
            value: "25° C",
            displayOrder: 7,
          },
          {
            name: "Water Change",
            slug: "water-change",
            isSystem: true,
            value: "25%, 2 per week",
            displayOrder: 8,
          },
          {
            name: "TDS",
            slug: "tds",
            isSystem: true,
            value: "75",
            displayOrder: 9,
          },
        ],
      },
      {
        name: "Scalare Summit",
        slug: "scalare-summit",
        description: "A large-format aquascape created in an ADA 150P aquarium.",
        isPublic: true,
        status: "APPROVED",
        images: [
          {
            src: "https://raw.githubusercontent.com/doulikecookiedough/aquascapetherapy/main/src/components/Aquascapes/Assets/150P_ScalareSummit.jpg",
            alt: "Scalare Summit aquascape in an ADA 150P aquarium.",
            displayOrder: 0,
            isPrimary: true,
          },
        ],
        equipment: [
          {
            category: "TANK",
            name: "ADA 150P",
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
            name: "Oase Biomaster 850",
            details: "x4",
            displayOrder: 2,
          },
        ],
        plants: [
          {
            name: "Bolbitis Heudelotii",
            slug: "bolbitis-heudelotii",
            displayOrder: 0,
          },
          { name: "Anubias Nana", slug: "anubias-nana", displayOrder: 1 },
          {
            name: "Anubias Nana Variegated",
            slug: "anubias-nana-variegated",
            displayOrder: 2,
          },
          { name: "Anubias Petite", slug: "anubias-petite", displayOrder: 3 },
          {
            name: "Java Fern Narrow",
            slug: "java-fern-narrow",
            displayOrder: 4,
          },
          {
            name: "Java Fern Needle Leaf",
            slug: "java-fern-needle-leaf",
            displayOrder: 5,
          },
          { name: "Java Fern Red", slug: "java-fern-red", displayOrder: 6 },
          {
            name: "Java Fern Windelov",
            slug: "java-fern-windelov",
            displayOrder: 7,
          },
          {
            name: "Riccardia Chamedryfolia",
            slug: "riccardia-chamedryfolia",
            displayOrder: 8,
          },
          { name: "Java Moss", slug: "java-moss", displayOrder: 9 },
          {
            name: "Cameroon Moss",
            slug: "cameroon-moss",
            displayOrder: 10,
          },
          {
            name: "Nymphaea Stellata",
            slug: "nymphaea-stellata",
            displayOrder: 11,
          },
          {
            name: "Aponogeton Ulvaceus",
            slug: "aponogeton-ulvaceus",
            displayOrder: 12,
          },
          {
            name: "Aponogeton Bolivianus",
            slug: "aponogeton-bolivianus",
            displayOrder: 13,
          },
          {
            name: "Bucephalandra Godzilla Red",
            slug: "bucephalandra-godzilla-red",
            displayOrder: 14,
          },
          {
            name: "Hygrophila Siamensis 53B",
            slug: "hygrophila-siamensis-53b",
            displayOrder: 15,
          },
          {
            name: "Micranthemum Umbrosum",
            slug: "micranthemum-umbrosum",
            displayOrder: 16,
          },
          {
            name: "Limnobium Laevigatum",
            slug: "limnobium-laevigatum",
            displayOrder: 17,
          },
        ],
        fauna: [
          {
            name: "Rio Nanay Peru Altum Angel",
            slug: "rio-nanay-peru-altum-angel",
            displayOrder: 0,
          },
          {
            name: "Somphongsi Rasbora",
            slug: "somphongsi-rasbora",
            displayOrder: 1,
          },
          {
            name: "Silver Flying Fox",
            slug: "silver-flying-fox",
            displayOrder: 2,
          },
          {
            name: "Otocinclus Catfish",
            slug: "otocinclus-catfish",
            displayOrder: 3,
          },
          {
            name: "Amano Shrimp",
            slug: "amano-shrimp",
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
            isSystem: false,
            value: "Manzanita Wood",
            displayOrder: 0,
          },
          {
            name: "Hardscape 2",
            slug: "hardscape-2",
            isSystem: false,
            value: "ADA Yamaya Stone",
            displayOrder: 1,
          },
          {
            name: "Substrate 1",
            slug: "substrate-1",
            isSystem: false,
            value: "ADA Amazonia",
            displayOrder: 2,
          },
          {
            name: "Substrate 2",
            slug: "substrate-2",
            isSystem: false,
            value: "ADA La Plata",
            displayOrder: 3,
          },
          {
            name: "Substrate 3",
            slug: "substrate-3",
            isSystem: false,
            value: "Lava Stone",
            displayOrder: 4,
          },
          {
            name: "Light Period",
            slug: "light-period",
            isSystem: true,
            value: "7 Hours",
            displayOrder: 5,
          },
          {
            name: "CO2",
            slug: "co2",
            isSystem: true,
            value: "5-6 BPS, 5 Hours",
            displayOrder: 6,
          },
          {
            name: "Temperature",
            slug: "temperature",
            unit: "C",
            isSystem: true,
            value: "25° C",
            displayOrder: 7,
          },
          {
            name: "Water Change",
            slug: "water-change",
            isSystem: true,
            value: "25%, 2 per week",
            displayOrder: 8,
          },
          {
            name: "TDS",
            slug: "tds",
            isSystem: true,
            value: "75",
            displayOrder: 9,
          },
        ],
      },
    ],
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
      {
        name: "School Garden",
        slug: "school-garden",
        description:
          "A planted aquascape built around layered stems, wood, and stone in an ADA 120P.",
        isPublic: true,
        status: "APPROVED",
        images: [
          {
            src: "https://raw.githubusercontent.com/doulikecookiedough/aquascapetherapy/main/src/components/Aquascapes/Assets/120P_SchoolGarden.jpg",
            alt: "School Garden aquascape in an ADA 120P aquarium.",
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
            name: "Oase Biomaster 600",
            details: "x2",
            displayOrder: 2,
          },
        ],
        plants: [
          {
            name: "Bolbitis Heudelotii",
            slug: "bolbitis-heudelotii",
            displayOrder: 0,
          },
          { name: "Rotala H'ra", slug: "rotala-hra", displayOrder: 1 },
          {
            name: "Rotala Macranda",
            slug: "rotala-macranda",
            displayOrder: 2,
          },
          { name: "Rotala Bonsai", slug: "rotala-bonsai", displayOrder: 3 },
          {
            name: "Hygrophila Araguaia",
            slug: "hygrophila-araguaia",
            displayOrder: 4,
          },
          { name: "Java Moss", slug: "java-moss", displayOrder: 5 },
          {
            name: "Eliocharis Acicularis 'Mini'",
            slug: "eliocharis-acicularis-mini",
            displayOrder: 6,
          },
          {
            name: "Aponogeton Boivianus",
            slug: "aponogeton-boivianus",
            displayOrder: 7,
          },
          {
            name: "Aponogeton Longiplumulosus",
            slug: "aponogeton-longiplumulosus",
            displayOrder: 8,
          },
          {
            name: "Cryptocoryne Undulatus 'Red'",
            slug: "cryptocoryne-undulatus-red",
            displayOrder: 9,
          },
          {
            name: "Cryptocoryne Wendtii 'Green'",
            slug: "cryptocoryne-wendtii-green",
            displayOrder: 10,
          },
          {
            name: "Lagenandra Meeboldii 'Red'",
            slug: "lagenandra-meeboldii-red",
            displayOrder: 11,
          },
          { name: "Blyxa Japonica", slug: "blyxa-japonica", displayOrder: 12 },
          {
            name: "Lilaeopsis Mauritiana",
            slug: "lilaeopsis-mauritiana",
            displayOrder: 13,
          },
          {
            name: "Riccardia Chamedryfolia",
            slug: "riccardia-chamedryfolia",
            displayOrder: 14,
          },
          {
            name: "Pogostemon Stellatus",
            slug: "pogostemon-stellatus",
            displayOrder: 15,
          },
          {
            name: "Myriophyllum Mattogrossense",
            slug: "myriophyllum-mattogrossense",
            displayOrder: 16,
          },
          {
            name: "Ranunculus Inundatus",
            slug: "ranunculus-inundatus",
            displayOrder: 17,
          },
          { name: "Nymphaea Lotus", slug: "nymphaea-lotus", displayOrder: 18 },
          {
            name: "Limnophila Aromatica 'Purple'",
            slug: "limnophila-aromatica-purple",
            displayOrder: 19,
          },
        ],
        fauna: [
          {
            name: "Albino Tiger Barbs",
            slug: "albino-tiger-barbs",
            displayOrder: 0,
          },
          {
            name: "Otocinclus Catfish",
            slug: "otocinclus-catfish",
            displayOrder: 1,
          },
          {
            name: "Silver Flying Fox",
            slug: "silver-flying-fox",
            displayOrder: 2,
          },
          { name: "Amano Shrimp", slug: "amano-shrimp", displayOrder: 3 },
          { name: "Cherry Shrimp", slug: "cherry-shrimp", displayOrder: 4 },
          { name: "Common Molly", slug: "common-molly", displayOrder: 5 },
          {
            name: "Ramshorn Snails",
            slug: "ramshorn-snails",
            displayOrder: 6,
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
            name: "Hardscape 3",
            slug: "hardscape-3",
            isSystem: true,
            value: "Flat River Stone",
            displayOrder: 2,
          },
          {
            name: "Substrate 1",
            slug: "substrate-1",
            isSystem: true,
            value: "ADA Amazonia",
            displayOrder: 3,
          },
          {
            name: "Substrate 2",
            slug: "substrate-2",
            isSystem: true,
            value: "Landscaping Sand",
            displayOrder: 4,
          },
          {
            name: "Substrate 3",
            slug: "substrate-3",
            isSystem: true,
            value: "Pea Gravel",
            displayOrder: 5,
          },
          {
            name: "Light Period",
            slug: "light-period",
            isSystem: true,
            value: "7 Hours",
            displayOrder: 6,
          },
          {
            name: "CO2",
            slug: "co2",
            isSystem: true,
            value: "3-4 BPS, 5 Hours",
            displayOrder: 7,
          },
          {
            name: "Temperature",
            slug: "temperature",
            unit: "C",
            isSystem: true,
            value: "22",
            displayOrder: 8,
          },
          {
            name: "Water Change",
            slug: "water-change",
            isSystem: true,
            value: "25%, 2 per week",
            displayOrder: 9,
          },
          {
            name: "TDS",
            slug: "tds",
            isSystem: true,
            value: "100",
            displayOrder: 10,
          },
        ],
      },
      {
        name: "Giant Pebbles",
        slug: "giant-pebbles",
        description:
          "A planted layout centered on large rounded stone forms, stem groupings, and layered foreground planting.",
        isPublic: true,
        status: "APPROVED",
        images: [
          {
            src: "https://raw.githubusercontent.com/doulikecookiedough/aquascapetherapy/main/src/components/Aquascapes/Assets/120P_GiantPebbles.jpg",
            alt: "Giant Pebbles aquascape in an ADA 120P aquarium.",
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
            name: "Oase Biomaster 600",
            details: "x2",
            displayOrder: 2,
          },
        ],
        plants: [
          {
            name: "Aponogeton Longiplumulosus",
            slug: "aponogeton-longiplumulosus",
            displayOrder: 0,
          },
          {
            name: "Pogostemon Stellatus",
            slug: "pogostemon-stellatus",
            displayOrder: 1,
          },
          { name: "Nymphaea Lotus", slug: "nymphaea-lotus", displayOrder: 2 },
          {
            name: "Nymphaea Stellata",
            slug: "nymphaea-stellata",
            displayOrder: 3,
          },
          {
            name: "Ranunculus Inundatus",
            slug: "ranunculus-inundatus",
            displayOrder: 4,
          },
          { name: "Blyxa Japonica", slug: "blyxa-japonica", displayOrder: 5 },
          {
            name: "Sagittaria Subulata",
            slug: "sagittaria-subulata",
            displayOrder: 6,
          },
          {
            name: "Hydrocotyle Tripartita",
            slug: "hydrocotyle-tripartita",
            displayOrder: 7,
          },
          {
            name: "Hygrophila Araguaia",
            slug: "hygrophila-araguaia",
            displayOrder: 8,
          },
          {
            name: "Cryptocoryne Wendtii 'Green'",
            slug: "cryptocoryne-wendtii-green",
            displayOrder: 9,
          },
          { name: "Rotala Green", slug: "rotala-green", displayOrder: 10 },
          { name: "Rotala H'ra", slug: "rotala-hra", displayOrder: 11 },
          {
            name: "Rotala Macranda",
            slug: "rotala-macranda",
            displayOrder: 12,
          },
          { name: "Rotala Bonsai", slug: "rotala-bonsai", displayOrder: 13 },
          {
            name: "Rotala Rotundifolia",
            slug: "rotala-rotundifolia",
            displayOrder: 14,
          },
          {
            name: "Rotala Wallichii",
            slug: "rotala-wallichii",
            displayOrder: 15,
          },
          { name: "Java Moss", slug: "java-moss", displayOrder: 16 },
        ],
        fauna: [
          {
            name: "Albino Tiger Barbs",
            slug: "albino-tiger-barbs",
            displayOrder: 0,
          },
          {
            name: "Otocinclus Catfish",
            slug: "otocinclus-catfish",
            displayOrder: 1,
          },
          {
            name: "Silver Flying Fox",
            slug: "silver-flying-fox",
            displayOrder: 2,
          },
          { name: "Amano Shrimp", slug: "amano-shrimp", displayOrder: 3 },
          { name: "Cherry Shrimp", slug: "cherry-shrimp", displayOrder: 4 },
          { name: "Common Molly", slug: "common-molly", displayOrder: 5 },
          {
            name: "Ramshorn Snails",
            slug: "ramshorn-snails",
            displayOrder: 6,
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
            name: "Hardscape 3",
            slug: "hardscape-3",
            isSystem: true,
            value: "Flat River Stone",
            displayOrder: 2,
          },
          {
            name: "Substrate 1",
            slug: "substrate-1",
            isSystem: true,
            value: "ADA Amazonia",
            displayOrder: 3,
          },
          {
            name: "Substrate 2",
            slug: "substrate-2",
            isSystem: true,
            value: "Landscaping Sand",
            displayOrder: 4,
          },
          {
            name: "Substrate 3",
            slug: "substrate-3",
            isSystem: true,
            value: "Pea Gravel",
            displayOrder: 5,
          },
          {
            name: "Light Period",
            slug: "light-period",
            isSystem: true,
            value: "7 Hours",
            displayOrder: 6,
          },
          {
            name: "CO2",
            slug: "co2",
            isSystem: true,
            value: "3-4 BPS, 5 Hours",
            displayOrder: 7,
          },
          {
            name: "Temperature",
            slug: "temperature",
            unit: "C",
            isSystem: true,
            value: "22",
            displayOrder: 8,
          },
          {
            name: "Water Change",
            slug: "water-change",
            isSystem: true,
            value: "25%, 2 per week",
            displayOrder: 9,
          },
          {
            name: "TDS",
            slug: "tds",
            isSystem: true,
            value: "100",
            displayOrder: 10,
          },
        ],
      },
    ],
  },
];
