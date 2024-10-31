import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const rejectLoad = async (land_id: number, crop_id: number) => {
    // if our task gets rejected push it back to task and unassign the task
    // new Area should be added back and filled should be marked false
    // crop should be added back and assignment status marked as false
    const land = await prisma.land.findUnique({
        where: { id: land_id },
        include: {
            Crop: true
        }
    });
    await prisma.land.update({
        where: {id: land_id},
        data: {
            assignedArea: 0,
            filled: false,
            Crop: {
                disconnect: [
                  { id: crop_id }
                ]
            }
        }
    });
    await prisma.crop.update({
        where: {id: crop_id},
        data: {
            assignedAmount: 0,
            assignmentStatus: false,
            landId: null
        }
    });
}

// model Land {
//     id       Int    @id @default(autoincrement())
//     farmerId Int
//     area     Float
//     assignedArea Float?
//     filled   Boolean  @default(false)
//     Crop     Crop[] @relation("planted")
//     SuitableCrop Crop[] @relation("suitable")
//     Farmer   Farmer @relation(fields: [farmerId], references: [id])
//   }