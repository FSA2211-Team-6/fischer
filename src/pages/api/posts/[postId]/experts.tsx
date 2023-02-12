import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

////////get expert responses based on postId////////

const ExpertResponsesApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET":
      const postId = req.query.postId;
      if (postId) {
        const data = await prisma.expertResponse.findMany({
          where: { postId: +postId },
          orderBy: { upvotes: "desc" },
          include: { expert: { include: { user: true } } },
        });
        return res.status(200).json(data);
      }

    case "POST":
      const incomingData = JSON.parse(req.body);
      try {
        const newComment = await prisma.expertResponse.create({
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

export default ExpertResponsesApi;
