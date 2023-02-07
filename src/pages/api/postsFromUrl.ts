import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const URL = req.body.url; 
    const posts = await prisma.post.findMany({
      include: {
        websiteArticle: {
          where: {
            articleURL: URL
          }
        }
      }
    })
    res.status(200).send(posts);
  }