import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function deleteAllData() {
  try {
    // Delete all data from each table in the correct order to avoid foreign key constraints
    await prisma.vehicle.deleteMany();
    await prisma.job.deleteMany();
    await prisma.crop.deleteMany();
    await prisma.demand.deleteMany();
    await prisma.land.deleteMany();
    await prisma.farmer.deleteMany();

    console.log("All data deleted from the database.");
  } catch (error) {
    console.error("Error deleting data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the function to delete all data
deleteAllData();
