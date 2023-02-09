import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data = JSON.parse(req.body);

    const userCompliance = await prisma.userCommentVote.updateMany({
      where: {
        fischerId: data.fischerId || null,
      },
      data: {
        compliance: data.compliance,
      },
    });

    res.status(200).send(userCompliance);
  }
}
