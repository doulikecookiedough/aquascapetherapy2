/*
  Warnings:

  - A unique constraint covering the columns `[tankId,slug]` on the table `Aquascape` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Aquascape` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AquascapeStatus" AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "EquipmentCategory" AS ENUM ('TANK', 'LIGHTING', 'FILTER', 'CO2', 'HEATING', 'SUBSTRATE', 'FERTILIZER', 'OTHER');

-- AlterTable
ALTER TABLE "Aquascape" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "AquascapeStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "AquascapeImage" (
    "id" TEXT NOT NULL,
    "aquascapeId" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AquascapeImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AquascapeEquipment" (
    "id" TEXT NOT NULL,
    "aquascapeId" TEXT NOT NULL,
    "category" "EquipmentCategory" NOT NULL,
    "name" TEXT NOT NULL,
    "details" TEXT,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AquascapeEquipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "scientificName" TEXT,
    "commonName" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AquascapePlant" (
    "id" TEXT NOT NULL,
    "aquascapeId" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AquascapePlant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fauna" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fauna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AquascapeFauna" (
    "id" TEXT NOT NULL,
    "aquascapeId" TEXT NOT NULL,
    "faunaId" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AquascapeFauna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FactType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "unit" TEXT,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FactType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AquascapeFact" (
    "id" TEXT NOT NULL,
    "aquascapeId" TEXT NOT NULL,
    "factTypeId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "displayOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AquascapeFact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AquascapeImage_aquascapeId_idx" ON "AquascapeImage"("aquascapeId");

-- CreateIndex
CREATE INDEX "AquascapeEquipment_aquascapeId_idx" ON "AquascapeEquipment"("aquascapeId");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_name_key" ON "Plant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Plant_slug_key" ON "Plant"("slug");

-- CreateIndex
CREATE INDEX "AquascapePlant_aquascapeId_idx" ON "AquascapePlant"("aquascapeId");

-- CreateIndex
CREATE INDEX "AquascapePlant_plantId_idx" ON "AquascapePlant"("plantId");

-- CreateIndex
CREATE UNIQUE INDEX "AquascapePlant_aquascapeId_plantId_key" ON "AquascapePlant"("aquascapeId", "plantId");

-- CreateIndex
CREATE UNIQUE INDEX "Fauna_name_key" ON "Fauna"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Fauna_slug_key" ON "Fauna"("slug");

-- CreateIndex
CREATE INDEX "AquascapeFauna_aquascapeId_idx" ON "AquascapeFauna"("aquascapeId");

-- CreateIndex
CREATE INDEX "AquascapeFauna_faunaId_idx" ON "AquascapeFauna"("faunaId");

-- CreateIndex
CREATE UNIQUE INDEX "AquascapeFauna_aquascapeId_faunaId_key" ON "AquascapeFauna"("aquascapeId", "faunaId");

-- CreateIndex
CREATE UNIQUE INDEX "FactType_name_key" ON "FactType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FactType_slug_key" ON "FactType"("slug");

-- CreateIndex
CREATE INDEX "AquascapeFact_aquascapeId_idx" ON "AquascapeFact"("aquascapeId");

-- CreateIndex
CREATE INDEX "AquascapeFact_factTypeId_idx" ON "AquascapeFact"("factTypeId");

-- CreateIndex
CREATE INDEX "Aquascape_status_idx" ON "Aquascape"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Aquascape_tankId_slug_key" ON "Aquascape"("tankId", "slug");

-- AddForeignKey
ALTER TABLE "AquascapeImage" ADD CONSTRAINT "AquascapeImage_aquascapeId_fkey" FOREIGN KEY ("aquascapeId") REFERENCES "Aquascape"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AquascapeEquipment" ADD CONSTRAINT "AquascapeEquipment_aquascapeId_fkey" FOREIGN KEY ("aquascapeId") REFERENCES "Aquascape"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AquascapePlant" ADD CONSTRAINT "AquascapePlant_aquascapeId_fkey" FOREIGN KEY ("aquascapeId") REFERENCES "Aquascape"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AquascapePlant" ADD CONSTRAINT "AquascapePlant_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AquascapeFauna" ADD CONSTRAINT "AquascapeFauna_aquascapeId_fkey" FOREIGN KEY ("aquascapeId") REFERENCES "Aquascape"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AquascapeFauna" ADD CONSTRAINT "AquascapeFauna_faunaId_fkey" FOREIGN KEY ("faunaId") REFERENCES "Fauna"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AquascapeFact" ADD CONSTRAINT "AquascapeFact_aquascapeId_fkey" FOREIGN KEY ("aquascapeId") REFERENCES "Aquascape"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AquascapeFact" ADD CONSTRAINT "AquascapeFact_factTypeId_fkey" FOREIGN KEY ("factTypeId") REFERENCES "FactType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
