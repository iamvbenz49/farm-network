const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findFarmerByGmail(gmail) {
  try {
    const farmer = await prisma.farmer.findUnique({
      where: {
        gmail: gmail
      }
    });

    if (farmer) {
      console.log("Farmer found:", farmer);
      return farmer; 
    } else {
      console.log("No farmer found with that gmail.");
      return null; 
    }
  } catch (error) {
    console.error("Error finding farmer by gmail:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = findFarmerByGmail; 
