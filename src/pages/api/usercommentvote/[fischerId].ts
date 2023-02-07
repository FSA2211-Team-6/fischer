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
      res.status(200).send(userCommentVote);

    case "POST":
      const createData = JSON.parse(req.body);
      const createdCommentVote = await prisma.userCommentVote.create({
        data: createData,
      });
      res.status(200).send(createdCommentVote);

    case "PUT":
      const data = JSON.parse(req.body);
      const updatedCommentVote = await prisma.userCommentVote.updateMany({
        where: {
          fischerId: Number(fischerId),
        },
        data: {
          compliance: data.compliance,
        },
      });
      res.status(200).send(updatedCommentVote);
  }
}
