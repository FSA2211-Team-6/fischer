import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  const fischerId = parseInt(query[0]);
  const topicId = parseInt(query[1]);

  if (req.method === "GET") {
    try {
      const expertise = await prisma.expert.findUnique({
        where: {
          fischerId_topicId: {
            fischerId,
            topicId,
          },
        },
      });
      res.json(expertise);
    } catch (err) {
      console.log(err);
    }
  } else if (req.method === "PUT") {
    await prisma.expert.upsert({
      where: {
        fischerId_topicId: {
          fischerId,
          topicId,
        },
      },
      update: {},
      create: {
        topicId,
        fischerId,
      },
    });
    res.status(200).send();
  }
}
