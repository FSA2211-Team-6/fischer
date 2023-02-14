import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  const fischerId = parseInt(query[0]);
  const topicId = parseInt(query[1]);
  const approval = query[2];

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
  } else if (req.method === "POST") {
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
  } else if (req.method === "PUT" && approval === "true") {
    await prisma.expert.upsert({
      where: {
        fischerId_topicId: {
          fischerId,
          topicId,
        },
      },
      update: {
        approval: true,
      },
      create: {
        topicId,
        fischerId,
      },
    });
    res.status(200).send();
  } else if (req.method === "PUT" && approval === "false") {
    await prisma.expert.upsert({
      where: {
        fischerId_topicId: {
          fischerId,
          topicId,
        },
      },
      update: {
        approval: false,
      },
      create: {
        topicId,
        fischerId,
      },
    });
    res.status(200).send();
  }
}
