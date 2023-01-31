import prisma from "./prismadb";
import { Prisma } from "@prisma/client";

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Winter",
    email: "Winter@gmail.com",
  },
  {
    name: "Eddie",
    email: "eddie@gmail.com",
  },
  {
    name: "Sam",
    email: "sam@gmail.com",
  },
  {
    name: "Derek",
    email: "derek@gmail.com",
  },
];

async function seed() {
  console.log("//// STARTING SEED...");
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with fischerId: ${user.fischerId}`);
  }
  console.log("/// SEEDING DONE!");
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

module.exports = seed;
