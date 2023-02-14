import { getPostStats } from "@/library/post/postHelpers";

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
        expertCompliances: true,
        expertResponses: true,
        comments: true,
      },
    });

    const post: Post = JSON.parse(JSON.stringify(data));

    const stats = getPostStats(post);

    res.status(200).send(stats);
  }
}
