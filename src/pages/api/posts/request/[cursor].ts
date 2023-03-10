import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const myCursor = req.query.cursor;

  const results = await prisma.post.findMany({
    take: 3,
    skip: 1, // Skip the cursor
    cursor: {
      id: Number(myCursor),
    },
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertCompliances: true,
      expertResponses: true,
      comments: true,
    },
    orderBy: { id: "desc" },
  });

  const posts = results;
  let newCursor = Number(myCursor);

  if (posts.length > 0) {
    newCursor = Number(myCursor) - posts.length;
  }

  res.status(200).send({ posts, newCursor });
}
