import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function UserExpertResponseVoteApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const fischerId = req.query.fischerId;
      const userExpertResponseVote =
        await prisma.userExpertResponseVote.findMany({
          where: { fischerId: Number(fischerId) },
        });
      return res.status(200).send(userExpertResponseVote);

    case "POST":
      const createData = JSON.parse(req.body);
      try {
        const createdExpertResponseVote =
          await prisma.userExpertResponseVote.create({
            data: createData,
          });
        return res.status(200).send(createdExpertResponseVote);
      } catch (err) {
        console.log(err);
        return res.status(403).send({ err: "Error adding vote" });
      }

    case "PUT":
      const data = JSON.parse(req.body);
      try {
        const updatedExpertResponseVote =
          await prisma.userExpertResponseVote.updateMany({
            where: {
              fischerId: data.fischerId,
              expertResponseId: data.expertResponseId,
            },
            data: {
              compliance: data.compliance,
            },
          });
        return res.status(200).send(updatedExpertResponseVote);
      } catch (err) {
        console.log(err);
        return res.status(403).send({ err: "Error changing upvote/downvote" });
      }
  }
}
