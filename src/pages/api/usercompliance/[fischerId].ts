// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../server/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fischerId = req.query.userId;
  const userCompliance = await prisma.userCompliance.findMany({
    where: { fischerId: fischerId },
  });
  res.status(200).send(userCompliance);
}
