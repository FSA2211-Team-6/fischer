// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

const checkHost = async (hostName: string) => {
  const host = await prisma.website.findUnique({
    where: { hostSite: hostName },
  });

  if (host) {
    return host;
  } else {
    return await prisma.website.create({ data: { hostSite: hostName } });
  }
};

const checkWebsiteArticle = async (articleURL: string, hostName: string) => {
  const article = await prisma.websiteArticle.findUnique({
    where: { articleURL: articleURL },
  });

  if (article) {
    return article;
  } else {
    const host = await checkHost(hostName);
    return await prisma.websiteArticle.create({
      data: { articleURL: articleURL, websiteId: host.id },
    });
  }
};

const checkTopic = async (topicName: string) => {
  const topic = await prisma.topic.findUnique({ where: { name: topicName } });

  if (topic) {
    return topic;
  } else {
    return await prisma.topic.create({ data: { name: topicName } });
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
){
try{
  if(req.method !== 'POST'){
    res.setHeader('Allow', 'POST');
    return res.status(405);
  }
  const data = JSON.parse(req.body)
  const post = data.post;
  const website = data.website;
  console.log(data)
  const host = await checkHost(website.host);
  const article = await checkWebsiteArticle(website.article, website.host);
  const topic = await checkTopic(post.topic);

  const addPost = {
    websiteArticleId: article.id,
    topicId: topic.id,
    fischerId: post.userId,
    assertion: post.assertion,
    aiResponse: post.aiResponse,
    aiCompliance: 1,
    topicName: topic.name,
  };
  
  const newPost = await prisma.post.create({ data: addPost });

  res.status(200).send(newPost);
}catch(err){
  res.send(err)
}
}
