// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fischerId = req.query.fischerId;
  const userCompliance = await prisma.userCompliance.findMany({
    where: { fischerId: Number(fischerId) },
  });

  const postIds = userCompliance.map((compliance) => {
    return compliance.postId;
  });

  const posts = await prisma.post.findMany({
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertResponses: true,
      comments: true,
    },
    where: { id: { in: [...postIds] } },
  });

  const sortedPosts = posts.sort((a, b) => {
    return b.userCompliances.length - a.userCompliances.length;
  });

  res.status(200).send({ userCompliance, sortedPosts });
}
