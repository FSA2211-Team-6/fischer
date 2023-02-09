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
        user: true,
        topic: true,
        comments: true,
        expertResponses: true,
      },
    });
    res.status(200).send(data);
  }
}
