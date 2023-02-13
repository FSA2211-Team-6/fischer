import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = req.query;
  const fischerId = parseInt(query[0]);
  const topicId = parseInt(query[1]);

  try {
    const expertise = await prisma.expert.findMany({
      where: {},
    });
    res.json(expertise);
  } catch (err) {
    console.log(err);
  }
  res.status(200).send();
}
