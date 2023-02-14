import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchString: string = req.query.searchString as string;

  const posts = await prisma.post.findMany({
    take: 2,
    where: { assertion: { contains: searchString, mode: "insensitive" } },
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertCompliances: true,
      expertResponses: true,
      comments: true,
    },
  });

  const searchResults: Array<Post> = JSON.parse(JSON.stringify(posts));

  //place cursor at last ID.
  const myCursor = searchResults[searchResults.length - 1].id;

  res.status(200).send({ searchResults, myCursor });
}
