import { PrismaClient, Farmer } from '@prisma/client';

export default async function seedLand(prisma: PrismaClient, lands: any[], farmers: Farmer[]) {
  return Promise.all(lands.map((land, index) => {
    return prisma.land.create({
      data: {
        farmerId: farmers[index].id,
        area: land.area,
      },
    });
  }));
}
