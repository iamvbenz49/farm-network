import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const manualDistributeLoad = async (farmer_id: number, crop_id: number) => {

    await prisma.farmer.update({
        where: {id: crop_id},
        data: {
            Crop: {
                connect: [
                  { id: crop_id }
                ]
            }
        }
    });
}

// model Farmer {
//     id           Int    @id @default(autoincrement())
//     name         String
//     password        String  @default("hello world")   
//     credit_score Float?
//     area         Float?
//     Crop         Crop[]
//     Job          Job[]
//     Land         Land[]
//   }