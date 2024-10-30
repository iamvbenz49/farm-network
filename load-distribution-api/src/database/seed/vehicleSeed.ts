import { PrismaClient } from '@prisma/client';

export default async function seedVehicle(prisma: PrismaClient, vehicles: any[]) {
  return Promise.all(vehicles.map(vehicle => {
    return prisma.vehicle.create({
      data: {
        numberPlate: vehicle.numberPlate,
        ownerName: vehicle.ownerName,
        score: vehicle.score,
      },
    });
  }));
}
