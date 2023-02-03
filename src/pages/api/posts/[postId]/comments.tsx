import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../server/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.postId;
  if (postId) {
    const data = await prisma.comment.findMany({
      where: { postId: +postId },
    });
    res.status(200).json(data);
  }
}
