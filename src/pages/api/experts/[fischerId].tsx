import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

const ExpertsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const fischerId = req.query.fischerId;
      if (fischerId) {
        const data = await prisma.expert.findMany({
          where: { fischerId: +fischerId },
          include: { expertResponses: true },
        });
        return res.status(200).json(data);
      }

    // case "POST":
    //   interface comment {
    //     postId: number;
    //     fischerId: number;
    //     content: string;
    //     upvotes: number;
    //     createdAt: Date;
    //   }
    //   const incomingData = JSON.parse(req.body);
    //   try {
    //     const newComment = await prisma.comment.create({
    //       data: incomingData,
    //     });
    //     return res.status(200).json(newComment);
    //   } catch (err) {
    //     console.log(err);
    //     res.status(403).json({ err: "Error adding comment" });
    //   }
    default:
      return res.status(405).json({
        message: "Method Not Allowed",
      });
  }
};

export default ExpertsApi;
