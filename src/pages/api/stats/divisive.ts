import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const divisiveExpertTrue = await prisma.post.findMany({
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertCompliances: true,
      expertResponses: true,
      comments: true,
    },
    where: {
      expertCompliances: { some: { compliance: 1 } },
      aiCompliance: -1,
    },
  });

  const divisiveExpertFalse = await prisma.post.findMany({
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertCompliances: true,
      expertResponses: true,
      comments: true,
    },
    where: {
      expertCompliances: { every: { compliance: -1 } },
      aiCompliance: 1,
    },
  });

  res.status(200).send([...divisiveExpertFalse, ...divisiveExpertTrue]);
}
