import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export interface comment {
  postId: number;
  fischerId: number;
  content: string;
  upvotes: number;
  createdAt: Date;
}

export default async function add(req: NextApiRequest, res: NextApiResponse) {
  const incomingData = JSON.parse(req.body);
  console.log("incoming data: ", JSON.stringify(incomingData));
  try {
    const newComment = await prisma.comment.create({
      data: incomingData,
    });
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error adding comment" });
  }
}
