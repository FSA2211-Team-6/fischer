import { Prisma } from "@prisma/client";
import prisma from "./prismadb";

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
  {
    name: "John",
    email: "john@gmail.com",
  },
  {
    name: "Alex",
    email: "alex@gmail.com",
  },
  {
    name: "Mud",
    email: "mud@gmail.com",
  },
  {
    name: "Core",
    email: "core@gmail.com",
  },
  {
    name: "Face",
    email: "face@gmail.com",
  },
  {
    name: "lip",
    email: "lip@gmail.com",
  },
  {
    name: "cackle",
    email: "cackle@gmail.com",
  },
  {
    name: "nemo",
    email: "nemo@gmail.com",
  },
  {
    name: "Julius Caeser",
    email: "juliusCaeser@gmail.com",
  },
  {
    name: "Genghis Khan",
    email: "genghisKhan@gmail.com",
  },
  {
    name: "Bobby Fischer",
    email: "bFischer@gmail.com",
  },
  {
    name: "wilfredo leon",
    email: "wilfredoleon@gmail.com",
  },
  {
    name: "mouse",
    email: "mouse@gmail.com",
  },
  {
    name: "car",
    email: "car@gmail.com",
  },
  {
    name: "cow",
    email: "cow@gmail.com",
  },
];

const websiteData = [
  { hostSite: "https://www.cnn.com" },
  { hostSite: "https://www.bbc.com" },
];

const websiteArticleData = [
  {
    articleURL:
      "https://www.cnn.com/travel/article/italy-florence-tourist-arrested-ponte-vecchio/index.html",
    websiteId: 1,
  },
  {
    articleURL: "https://www.bbc.com/news/world-us-canada-64471490",
    websiteId: 2,
  },
  {
    articleURL: "https://www.bbc.com/news/world-us-canada-64473260",
    websiteId: 2,
  },
];

const topicData = [
  {
    name: "Animals",
  },
  {
    name: "Science",
  },
  {
    name: "Politics",
  },
];

const postData = [
  {
    assertion: "Elephants are big",
    aiResponse:
      "[False, Objective, Elephants are the largest land animals, typically weighing between 4,000 and 7,000 kg (8,800 and 15,400 lb).]",
    topicName: "Animals",
    websiteArticleId: 1,
    topicId: 1,
    fischerId: 1,
  },
  {
    assertion: "assertion numba 2 for testing",
    aiResponse:
      "[True, Objective, testing testing testing testing testing testing testing testing testing testing]",
    topicName: "Science",
    websiteArticleId: 1,
    topicId: 2,
    fischerId: 2,
  },
  {
    assertion: "assertion numba 3 for testing",
    aiResponse:
      "[False, Subjective, testing testing testing testing testing testing testing testing testing testing]",
    topicName: "Politics",
    websiteArticleId: 2,
    topicId: 3,
    fischerId: 3,
  },
  {
    assertion: "assertion numba 4 for testing",
    aiResponse:
      "[False, Objective, testing testing testing testing testing testing testing testing testing testing]",
    topicName: "Politics",
    websiteArticleId: 2,
    topicId: 3,
    fischerId: 3,
  },
  {
    assertion: "assertion numba 5 for testing",
    aiResponse:
      "[True, Objective, testing testing testing testing testing testing testing testing testing testing]",
    topicName: "Science",
    websiteArticleId: 3,
    topicId: 2,
    fischerId: 4,
  },
  {
    assertion: "assertion numba 6 for testing",
    aiResponse:
      "[True, Objective, testing testing testing testing testing testing testing testing testing testing]",
    topicName: "Science",
    websiteArticleId: 1,
    topicId: 2,
    fischerId: 4,
  },
  {
    assertion: "assertion numba 7 for testing",
    aiResponse:
      "[True, Objective, testing testing testing testing testing testing testing testing testing testing]",
    topicName: "Science",
    websiteArticleId: 1,
    topicId: 2,
    fischerId: 2,
  },
  {
    assertion: "assertion numba 8 for testing",
    aiResponse:
      "[True, Objective, testing testing testing testing testing testing testing testing testing testing]",
    topicName: "Science",
    websiteArticleId: 1,
    topicId: 2,
    fischerId: 2,
  },
  {
    assertion: "assertion numba 9 for testing",
    aiResponse:
      "[False, Objective, testing testing testing testing testing testing testing testing testing testing]",
    topicName: "Animals",
    websiteArticleId: 1,
    topicId: 1,
    fischerId: 3,
  },
  {
    assertion: "assertion numba 10 for testing",
    aiResponse:
      "[False, Objective, testing testing testing testing testing testing testing testing testing testing]",
    topicName: "Animals",
    websiteArticleId: 1,
    topicId: 1,
    fischerId: 3,
  },
  {
    assertion: "assertion numba 11 for testing",
    aiResponse:
      "[False, Objective, testing testing testing testing testing testing testing testing testing testing]",
    topicName: "Animals",
    websiteArticleId: 1,
    topicId: 1,
    fischerId: 1,
  },
  {
    assertion: "assertion numba 12 for testing",
    aiResponse:
      "[False, Objective, testing testing testing testing testing testing testing testing testing testing]",
    topicName: "Animals",
    websiteArticleId: 1,
    topicId: 1,
    fischerId: 4,
  },
];

async function seed() {
  console.log("//// STARTING SEED...");

  //Creating user
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user ${user.name} with fischerId: ${user.fischerId}`);
  }

  //Creating websites
  for (const w of websiteData) {
    const website = await prisma.website.create({
      data: w,
    });
    console.log(`Created website ${website.hostSite} with id: ${website.id}`);
  }

  //Creating articles
  for (const a of websiteArticleData) {
    const websiteArticle = await prisma.websiteArticle.create({
      data: a,
    });
    console.log(
      `Created websiteArticle ${websiteArticle.articleURL} with id: ${websiteArticle.id}`
    );
  }

  //Creating topics
  for (const t of topicData) {
    const topic = await prisma.topic.create({
      data: t,
    });
    console.log(`Created topic ${topic.name} with id: ${topic.id}`);
  }

  //Creating posts
  for (const p of postData) {
    const post = await prisma.post.create({
      data: p,
    });
    console.log(`Created post with id: ${post.id}`);
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
