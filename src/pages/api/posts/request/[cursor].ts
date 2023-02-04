import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const myCursor = req.query.cursor;

  const results = await prisma.post.findMany({
    take: 2,
    skip: 1, // Skip the cursor
    cursor: {
      id: Number(myCursor),
    },
    include: { websiteArticle: { include: { website: true } }, user: true },
  });

  const posts = results;

  const newCursor = Number(myCursor) + 2;

  res.status(200).send({ posts, newCursor });
}
