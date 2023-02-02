import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../server/db/prismadb";

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

  const posts: Array<firstPosts> = JSON.parse(JSON.stringify(results));

  const newCursor = Number(myCursor) + 2;

  res.status(200).send({ posts, newCursor });
}