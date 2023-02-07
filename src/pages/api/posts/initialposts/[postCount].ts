import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //the number of posts we want on initial load
  const numResults = req.query.postCount;

  //query to get intitial posts
  const posts = await prisma.post.findMany({
    take: Number(numResults),
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertResponses: true,
    },
  });

  const firstPosts: Array<firstPosts> = JSON.parse(JSON.stringify(posts));

  //place cursor at last ID.
  const myCursor = firstPosts[firstPosts.length - 1].id;

  res.status(200).send({ firstPosts, myCursor });
}
