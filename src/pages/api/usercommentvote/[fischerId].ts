import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function UserCommentVoteApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const fischerId = req.query.fischerId;
      const userCommentVote = await prisma.userCommentVote.findMany({
        where: { fischerId: Number(fischerId) },
      });
      return res.status(200).send(userCommentVote);

    case "POST":
      const createData = JSON.parse(req.body);
      try {
        const createdCommentVote = await prisma.userCommentVote.create({
          data: createData,
        });
        return res.status(200).send(createdCommentVote);
      } catch (err) {
        console.log(err);
        return res.status(403).send({ err: "Error adding vote" });
      }

    case "PUT":
      const data = JSON.parse(req.body);
      try {
        const updatedCommentVote = await prisma.userCommentVote.updateMany({
          where: {
            fischerId: data.fischerId,
            commentId: data.commentId,
          },
          data: {
            compliance: data.compliance,
          },
        });
        return res.status(200).send(updatedCommentVote);
      } catch (err) {
        console.log(err);
        return res.status(403).send({ err: "Error changing upvote/downvote" });
      }
  }
}
