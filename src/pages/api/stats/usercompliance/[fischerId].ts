// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fischerId = req.query.fischerId;

  const compliance = await prisma.userCompliance.findMany({
    where: { fischerId: Number(fischerId) },
  });
  const expertCompliance = await prisma.expertCompliance.findMany({
    where: { fischerId: Number(fischerId) },
  });

  const userCompliance = [...compliance, ...expertCompliance];

  const userPostIds = userCompliance.map((compliance) => {
    return compliance.postId;
  });
  const expertPostIds = expertCompliance.map((compliance) => {
    return compliance.postId;
  });

  const postIds = [...userPostIds, ...expertPostIds];

  const posts = await prisma.post.findMany({
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertCompliances: true,
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
