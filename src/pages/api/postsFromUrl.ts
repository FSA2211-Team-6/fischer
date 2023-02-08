import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const url = req.body.url;
     
    const id = await prisma.websiteArticle.findFirst({
      where: {
        articleURL: url
      }
    })

    const posts = await prisma.post.findMany({
      where: {
        websiteArticleId: id?.id
      }
    })

    res.status(200).send(posts);
  }