import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  const page = parseInt(query[0]);
  const filter = query[1];

  const users = await prisma.user.findMany({
    skip: (page - 1) * 20,
    take: 20,
    where: {
      name: {
        contains: filter,
        mode: "insensitive",
      },
    },
    include: {
      expertise: {
        where: {
          approval: true,
        },
      },
      comments: true,
      posts: true,
    },
  });
  res.json(users);
}
