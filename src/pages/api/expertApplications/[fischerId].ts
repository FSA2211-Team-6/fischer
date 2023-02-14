import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fischerString: any = req.query.fischerId;
  const fischerId: any = parseInt(fischerString);

  try {
    if (fischerId === 0) {
      const expertise = await prisma.expert.findMany({
        where: {
          approval: null,
        },
        include: {
          user: {
            select: {
              name: true,
              fischerId: true,
            },
          },
          topic: true,
        },
      });
      res.json(expertise);
    } else {
      const expertise = await prisma.expert.findMany({
        where: {
          AND: [{ fischerId }, { approval: null }],
        },
      });
      res.json(expertise);
    }
  } catch (err) {
    console.log(err);
  }
  res.status(200).send("success");
}
