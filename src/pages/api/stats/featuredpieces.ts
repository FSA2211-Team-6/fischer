import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.post.findMany({
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertResponses: true,
      comments: true,
    },
    orderBy: { comments: { _count: "desc" } },
  });

  const featuredPieces = data.slice(0, 5);

  res.status(200).send(featuredPieces);
}
