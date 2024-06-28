import fs from "fs";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function insertDataFromFile() {
  try {
    // Read the data from the JSON file
    const data = JSON.parse(fs.readFileSync("data.json", "utf8"));

    // Insert users
    await prisma.user.createMany({
      data: data.users,
    });

    // Insert confessions
    await prisma.confession.createMany({
      data: data.confessions,
    });

    // Insert likes
    await prisma.like.createMany({
      data: data.likes,
    });

    console.log("Data stored in the database successfully!");
  } catch (error) {
    console.error("Error storing data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

insertDataFromFile();
