/*
  Warnings:

  - A unique constraint covering the columns `[gmail]` on the table `MarketMan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gmail` to the `MarketMan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MarketMan" ADD COLUMN     "gmail" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'temp',
ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'hell0';

-- CreateIndex
CREATE UNIQUE INDEX "MarketMan_gmail_key" ON "MarketMan"("gmail");
