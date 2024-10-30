import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getLands() {
  try {
    const landData = await prisma.land.findMany({
      where: {
        filled: false    
      },
      include: {
        Crop: true,      
        Farmer: true    
      }
    });
    return landData;
  } catch (error) {
    console.error("Error fetching unfilled land data:", error);
  } finally {
    await prisma.$disconnect();
  }
  return []
}

