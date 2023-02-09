// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.postId;
  if (postId) {
    const data = await prisma.post.findUnique({
      where: { id: +postId },
      include: {
        websiteArticle: { include: { website: true } },
        user: true,
        userCompliances: true,
        expertResponses: true,
        comments: true,
      },
    });
    res.status(200).send(data);
  }
}
