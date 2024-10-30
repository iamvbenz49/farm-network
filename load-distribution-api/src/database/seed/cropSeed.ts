import { PrismaClient, Farmer, Job, Land, Demand } from '@prisma/client';

export default async function seedCrop(prisma: PrismaClient, crops: any[], farmers: Farmer[], jobs: Job[], lands: Land[], demands: Demand[]) {
  return Promise.all(crops.map((crop, index) => {
    return prisma.crop.create({
      data: {
        name: crop.name,
        amount: crop.amount,
        landSpacing: crop.landSpacing,
        farmerId: farmers[index % farmers.length].id, // Using modulus for demo purposes
        jobId: jobs[index % jobs.length].id,
        landId: lands[index % lands.length].id,
        demandId: demands[index % demands.length].id,
        subType: crop.subType,
        description: crop.description,
        assignmentStatus: crop.assignmentStatus,
      },
    });
  }));
}
