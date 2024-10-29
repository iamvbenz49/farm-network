import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function createDemandWithDetails() {
    const farmerA = await prisma.farmer.create({
        data: {
            name: 'Farmer A',
            // add other required fields if any
        }
    });

    const farmerB = await prisma.farmer.create({
        data: {
            name: 'Farmer B',
            // add other required fields if any
        }
    });

    const demand = await prisma.demand.create({
        data: {
            deadline: new Date('2024-12-31'),
            mrp: 150.5,
            msp: 100.0,
            Crop: {
                create: [
                    {
                        name: 'Wheat',
                        amount: 500,
                        subType: 'Grain',
                        description: 'High-quality wheat',
                        assignmentStatus: false
                    },
                    {
                        name: 'Corn',
                        amount: 300,
                        subType: 'Grain',
                        description: 'Organic corn',
                        assignmentStatus: true
                    }
                ],
            },
            Job: {
                create: [
                    {
                        startDate: new Date('2024-11-01'),
                        endDate: new Date('2024-12-01'),
                        farmerId: farmerA.id // Use the ID of Farmer A
                    },
                    {
                        startDate: new Date('2024-10-01'),
                        endDate: new Date('2024-11-01'),
                        farmerId: farmerB.id // Use the ID of Farmer B
                    }
                ]
            },
            Vehicle: {
                create: [
                    {
                        numberPlate: 'ABC1234',
                        ownerName: 'John Doe',
                        score: 5
                    },
                    {
                        numberPlate: 'XYZ5678',
                        ownerName: 'Jane Smith',
                        score: 8
                    }
                ]
            }
        },
    });

    console.log('Created Demand with associated details:', demand);
}

// Call the function
createDemandWithDetails();
