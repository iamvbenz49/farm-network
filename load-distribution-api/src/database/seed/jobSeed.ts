import { PrismaClient, Farmer, Demand } from '@prisma/client';

export default async function seedJob(prisma: PrismaClient, jobs: any[], farmers: Farmer[], demands: Demand[]) {
  return Promise.all(jobs.map((job, index) => {
    return prisma.job.create({
      data: {
        startDate: job.startDate,
        endDate: job.endDate,
        farmerId: farmers[index].id,
        demandId: demands[index % demands.length].id, // Using modulus for demo purposes
      },
    });
  }));
}
