// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { data } from "autoprefixer";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    console.log(data);

    const userCompliance = await prisma.userCompliance.create({ data: data });

    res.status(200).send(userCompliance);
  }

  if (req.method === "GET") {
    const userCompliance = await prisma.userCompliance.findMany({
      where: { fischerId: data.fischerId },
    });
    res.status(200).send(userCompliance);
  }
}
