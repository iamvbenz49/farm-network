const createHash = require('../utils/createHash');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function insertFarmer(name, gmail, credit_score, area, password) {
  try {
    const hashedPassword = await createHash(password); 
    const newFarmer = await prisma.farmer.create({
      data: {
        name: name,
        gmail: gmail,
        credit_score: credit_score,
        area: area,
        password: hashedPassword 
      }
    });

    console.log("New Farmer created:", newFarmer);
  } catch (error) {
    console.error("Error inserting farmer:", error);
  } finally {
    await prisma.$disconnect(); 
  }
}

