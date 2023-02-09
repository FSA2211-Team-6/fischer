import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

const SingleCommentApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const commentId = req.query.commentId;

  switch (req.method) {
    case "GET":
      if (commentId) {
        const data = await prisma.comment.findUnique({
          where: { id: +commentId },
        });
        return res.status(200).json(data);
      }
    case "PUT":
      const data = JSON.parse(req.body);
      console.log("data sent for upvotes update: ", data);
      try {
        const updatedComment = await prisma.comment.updateMany({
          where: {
            id: data.commentId,
          },
          data: {
            upvotes: data.upvotes,
            content: data.content,
          },
        });
        return res.status(200).json(updatedComment);
      } catch (err) {
        console.log(err);
        return res.status(403).send({ err: "Error updating comment!" });
      }
  }
};

export default SingleCommentApi;
