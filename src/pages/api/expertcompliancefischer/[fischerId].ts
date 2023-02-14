// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fischerId = req.query.fischerId;
  const expertCompliance = await prisma.expertCompliance.findMany({
    where: { fischerId: Number(fischerId) },
  });
  res.status(200).send(expertCompliance);
}
