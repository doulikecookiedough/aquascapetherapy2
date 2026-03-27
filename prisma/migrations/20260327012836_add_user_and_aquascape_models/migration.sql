/*
  Warnings:

  - You are about to drop the column `description` on the `Tank` table. All the data in the column will be lost.
  - You are about to drop the column `volumeLiters` on the `Tank` table. All the data in the column will be lost.
  - Added the required column `heightCm` to the `Tank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lengthCm` to the `Tank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Tank` table without a default value. This is not possible if the table is not empty.
  - Added the required column `widthCm` to the `Tank` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tank" DROP COLUMN "description",
DROP COLUMN "volumeLiters",
ADD COLUMN     "heightCm" INTEGER NOT NULL,
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lengthCm" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "widthCm" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aquascape" (
    "id" TEXT NOT NULL,
    "tankId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aquascape_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Aquascape_tankId_idx" ON "Aquascape"("tankId");

-- CreateIndex
CREATE INDEX "Aquascape_isPublic_idx" ON "Aquascape"("isPublic");

-- CreateIndex
CREATE INDEX "Tank_userId_idx" ON "Tank"("userId");

-- CreateIndex
CREATE INDEX "Tank_isPublic_idx" ON "Tank"("isPublic");

-- AddForeignKey
ALTER TABLE "Tank" ADD CONSTRAINT "Tank_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aquascape" ADD CONSTRAINT "Aquascape_tankId_fkey" FOREIGN KEY ("tankId") REFERENCES "Tank"("id") ON DELETE CASCADE ON UPDATE CASCADE;
