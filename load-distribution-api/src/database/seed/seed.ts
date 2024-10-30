import { PrismaClient } from '@prisma/client';
import { seedData } from './seedData';
import seedDemand from './demandSeed';
import seedFarmer from './farmerSeed';
import seedLand from './landSeed';
import seedJob from './jobSeed';
import seedCrop from './cropSeed';
import seedVehicle from './vehicleSeed';

const prisma = new PrismaClient();

async function main() {
  const demands = await seedDemand(prisma, seedData.demands);
  const farmers = await seedFarmer(prisma, seedData.farmers);
  const lands = await seedLand(prisma, seedData.lands, farmers);
  const jobs = await seedJob(prisma, seedData.jobs, farmers, demands);
  await seedCrop(prisma, seedData.crops, farmers, jobs, lands, demands);
  await seedVehicle(prisma, seedData.vehicles);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
