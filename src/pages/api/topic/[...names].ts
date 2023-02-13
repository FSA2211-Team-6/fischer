import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { names } = req.query;
  const currentName = names[0];
  const newName = names[1];

  const topic = await prisma.topic.upsert({
    where: { name: currentName },
    update: { name: newName },
    create: { name: newName },
  });
  res.json(topic);
}
