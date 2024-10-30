import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTasks() {
    const demands = await prisma.demand.findMany({
        where: {
            Crop: {
                some: {
                    assignmentStatus: false 
                }
            }
        },
        include: {
            Crop: true, 
            Job: true,  
            Vehicle: true 
        }
    });
    
    return demands;
}

getTasks()
.then(data => console.log(data))
.catch(err => console.log(err));