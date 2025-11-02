/*
  Warnings:

  - Made the column `petFriendly` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "amenities" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "zipCode" SET DATA TYPE TEXT,
ALTER COLUMN "petFriendly" SET NOT NULL;
