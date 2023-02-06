import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

const CommentsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const postId = req.query.postId;
      if (postId) {
        const data = await prisma.comment.findMany({
          where: { postId: +postId },
          include: {
            commenter: true,
          },
        });
        return res.status(200).json(data);
      }

    case "POST":
      interface comment {
        postId: number;
        fischerId: number;
        content: string;
        upvotes: number;
        createdAt: Date;
      }
      const incomingData = JSON.parse(req.body);
      try {
        const newComment = await prisma.comment.create({
          data: incomingData,
        });
        return res.status(200).json(newComment);
      } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Error adding comment" });
      }
    default:
      return res.status(405).json({
        message: "Method Not Allowed",
      });
  }
};

export default CommentsApi;
