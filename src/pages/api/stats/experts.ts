import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const expertsNeeded = await prisma.post.findMany({
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertCompliances: true,
      expertResponses: true,
      comments: true,
    },
    where: {
      expertResponses: { none: {} },
    },
  });

  res.status(200).send(expertsNeeded);
}
