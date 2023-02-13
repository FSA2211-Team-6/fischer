// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const expertId = req.query.expertId;
  const expertCompliance = await prisma.expertCompliance.findMany({
    where: { expertId: Number(expertId) },
  });
  res.status(200).send(expertCompliance);
}
