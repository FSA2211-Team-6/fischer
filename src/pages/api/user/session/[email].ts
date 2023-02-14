// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.query.email;

  const data = await prisma.user.findUnique({
    where: { email },
    include: {
      comments: true,
      expertise: {
        include: {
          topic: true,
        },
      },
      posts: true,
      userCompliances: true,
    },
  });

  res.status(200).send(data);
}
