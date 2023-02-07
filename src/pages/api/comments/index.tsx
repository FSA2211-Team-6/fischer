import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

const CommentsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await prisma.comment.findMany();
  return res.status(200).json(data);
};

export default CommentsApi;
