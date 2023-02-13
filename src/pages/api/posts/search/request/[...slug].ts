import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query as { slug: string };
  const searchString = slug[0];
  const myCursor = slug[1];

  const results = await prisma.post.findMany({
    take: 2,
    skip: 1, // Skip the cursor
    cursor: {
      id: Number(myCursor),
    },
    where: { assertion: { contains: searchString, mode: "insensitive" } },
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertCompliances: true,
      expertResponses: true,
    },
  });

  const searchResults: Array<Post> = JSON.parse(JSON.stringify(results));

  const newCursor = Number(myCursor) + 2;

  res.status(200).send({ searchResults, newCursor });
}
