import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

const ExpertResponseApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const expertResponseId = req.query.expertResponseId;

  switch (req.method) {
    case "GET":
      if (expertResponseId) {
        const data = await prisma.expertResponse.findUnique({
          where: { id: +expertResponseId },
        });
        return res.status(200).json(data);
      }
    case "PUT":
      const data = JSON.parse(req.body);
      try {
        const updatedExpertResponse = await prisma.expertResponse.updateMany({
          where: {
            id: data.expertResponseId,
          },
          data: {
            upvotes: data.upvotes,
            content: data.content,
            compliance: data.compliance,
          },
        });
        return res.status(200).json(updatedExpertResponse);
      } catch (err) {
        console.log(err);
        return res.status(403).send({ err: "Error updating expert response!" });
      }
    case "DELETE":
      if (expertResponseId) {
        const deletedExpertResponse = await prisma.expertResponse.delete({
          where: {
            id: +expertResponseId,
          },
        });
        return res.status(200).json(deletedExpertResponse);
      }
  }
};

export default ExpertResponseApi;
