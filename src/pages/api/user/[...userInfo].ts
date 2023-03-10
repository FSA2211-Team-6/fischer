import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userInfo }: any = req.query;
  if (req.method === "DELETE") {
    const data = await prisma.user.delete({
      where: {
        id: userInfo[0],
      },
    });
    res.status(200).json(data);
  } else if (req.method === "UPDATE") {
    const data = await prisma.user.update({
      where: {
        id: userInfo[0],
      },
      data: userInfo[1],
    });
    res.status(200).json(data);
  }
}
