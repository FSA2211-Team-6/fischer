import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";
import { getPostStats } from "@/library/post/postHelpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = await prisma.post.findMany({
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertResponses: true,
      comments: true,
    },
  });

  const allPosts: Array<Post> = JSON.parse(JSON.stringify(posts));

  const websiteTruth = {};

  //   const postStats = allPosts.map((post) => {
  //     return {
  //       postId: post.id,
  //       websiteId: post.websiteArticle.website.id,
  //       websiteName: post.websiteArticle.website.hostSite,
  //       postStats: getPostStats(post),
  //     };
  //   });

  allPosts.forEach((post) => {
    if (websiteTruth[post.websiteArticle.website.id]) {
      websiteTruth[post.websiteArticle.website.id].truthinessValues.push(
        getPostStats(post).truthAsNumber
      );
    } else {
      websiteTruth[post.websiteArticle.website.id] = {
        truthinessValues: [getPostStats(post).truthAsNumber],
        chartData: { hostSite: post.websiteArticle.website.hostSite },
      };
    }
  });

  const truthArray = [];

  for (let key in websiteTruth) {
    websiteTruth[key].chartData.averageTruthiness = Number(
      (
        websiteTruth[key].truthinessValues.reduce((a, b) => a + b) /
        websiteTruth[key].truthinessValues.length
      ).toFixed(2)
    );

    truthArray.push(websiteTruth[key].chartData);
    console.log(typeof truthArray[0].averageTruthiness);
  }

  res.status(200).send(truthArray);
}
