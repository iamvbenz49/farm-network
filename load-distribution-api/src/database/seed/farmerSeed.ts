import { PrismaClient } from '@prisma/client';

export default async function seedFarmer(prisma: PrismaClient, farmers: any[]) {
  return Promise.all(farmers.map(farmer => {
    return prisma.farmer.create({
      data: {
        name: farmer.name,
        credit_score: farmer.credit_score,
        area: farmer.area,
      },
    });
  }));
}
