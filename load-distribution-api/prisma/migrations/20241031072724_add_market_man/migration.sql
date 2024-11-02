-- AlterTable
ALTER TABLE "Demand" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "marketID" INTEGER;

-- CreateTable
CREATE TABLE "MarketMan" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "MarketMan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_marketID_fkey" FOREIGN KEY ("marketID") REFERENCES "MarketMan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
