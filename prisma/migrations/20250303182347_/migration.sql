/*
  Warnings:

  - You are about to alter the column `lowestPrice` on the `flightSearchHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to alter the column `higherPrice` on the `flightSearchHistory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "flightSearchHistory" ALTER COLUMN "lowestPrice" SET DATA TYPE DECIMAL(10,2),
ALTER COLUMN "higherPrice" SET DATA TYPE DECIMAL(10,2);
