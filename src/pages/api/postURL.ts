import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const url = req.body.url
    
    const id = await prisma.websiteArticle.findMany({
      where: {
        articleURL: url,
      },
    })
    const articleId = id[0].id;

    const posts = await prisma.post.findMany({
      where: {
        websiteArticleId: articleId
    }})

    res.status(200).send(posts);
  }