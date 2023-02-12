import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const topSites = await prisma.websiteArticle.groupBy({
    by: ["websiteId"],
    _count: { articleURL: true },
  });

  const idList = topSites.map((site) => {
    return site.websiteId;
  });

  const siteNames = await prisma.website.findMany({
    select: { hostSite: true, id: true },
    where: { id: { in: [...idList] } },
  });

  const siteMap = siteNames.map((site) => {
    return {
      id: site.id,
      name: site.hostSite,
      count: topSites.filter((item) => {
        return item.websiteId === site.id;
      })[0]._count.articleURL,
    };
  });

  const posts = await prisma.post.findMany({
    include: {
      websiteArticle: { include: { website: true } },
      user: true,
      userCompliances: true,
      expertResponses: true,
      comments: true,
    },
    where: { websiteArticle: { website: { id: { in: [...idList] } } } },
  });

  res.status(200).send({ siteMap, posts });
}
