-- CreateTable
CREATE TABLE "Crop" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "landSpacing" INTEGER NOT NULL,
    "farmerId" INTEGER,
    "jobId" INTEGER,
    "landId" INTEGER,
    "demandId" INTEGER NOT NULL,
    "subType" TEXT,
    "description" TEXT,
    "assignmentStatus" BOOLEAN NOT NULL,
    "assignedAmount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Crop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Demand" (
    "id" SERIAL NOT NULL,
    "deadline" TIMESTAMP(3),
    "mrp" DOUBLE PRECISION,
    "msp" DOUBLE PRECISION,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "marketID" INTEGER,

    CONSTRAINT "Demand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farmer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gmail" TEXT NOT NULL,
    "credit_score" DOUBLE PRECISION,
    "area" DOUBLE PRECISION,
    "password" TEXT NOT NULL DEFAULT 'hello world',

    CONSTRAINT "Farmer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "farmerId" INTEGER NOT NULL,
    "demandId" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Land" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "filled" BOOLEAN NOT NULL DEFAULT false,
    "assignedArea" DOUBLE PRECISION,

    CONSTRAINT "Land_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "numberPlate" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "score" INTEGER,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketMan" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "MarketMan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DemandToVehicle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Farmer_gmail_key" ON "Farmer"("gmail");

-- CreateIndex
CREATE UNIQUE INDEX "_DemandToVehicle_AB_unique" ON "_DemandToVehicle"("A", "B");

-- CreateIndex
CREATE INDEX "_DemandToVehicle_B_index" ON "_DemandToVehicle"("B");

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "Crop_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crop" ADD CONSTRAINT "main_fk" FOREIGN KEY ("landId") REFERENCES "Land"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Demand" ADD CONSTRAINT "Demand_marketID_fkey" FOREIGN KEY ("marketID") REFERENCES "MarketMan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Land" ADD CONSTRAINT "Land_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "Farmer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandToVehicle" ADD CONSTRAINT "_DemandToVehicle_A_fkey" FOREIGN KEY ("A") REFERENCES "Demand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandToVehicle" ADD CONSTRAINT "_DemandToVehicle_B_fkey" FOREIGN KEY ("B") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
