import { PrismaClient } from '@prisma/client';

export default async function seedDemand(prisma: PrismaClient, demands: any[]) {
  return Promise.all(demands.map(demand => {
    return prisma.demand.create({
      data: {
        deadline: demand.deadline,
        mrp: demand.mrp,
        msp: demand.msp,
      },
    });
  }));
}
