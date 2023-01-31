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

const parseResponse = async (aiResponse: string) => {
  const responseArray = aiResponse.replace("[", "").replace("]", "").split(",");

  const aiTruthy = responseArray[0].trim();
  const aiObjectivity = responseArray[1].trim();
  const aiExplanation = responseArray[2].trim();

  let compliance = 0;

  if (aiTruthy === "True" && aiObjectivity === "Objective") {
    compliance = 1;
  }

  if (aiTruthy === "False" && aiObjectivity === "Objective") {
    compliance = -1;
  }

  const cleanResponse = aiExplanation.replace("Explanation: ", "");

  return { compliance, cleanResponse };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const post = req.body.post;
  const website = req.body.website;

  const aiData = await parseResponse(post.aiResponse);
  await checkHost(website.host);
  const article = await checkWebsiteArticle(website.article, website.host);
  const topic = await checkTopic(post.topic);

  const addPost = {
    websiteArticleId: article.id,
    topicId: topic.id,
    fischerUserId: post.userId,
    assertion: post.assertion,
    aiResponse: aiData.cleanResponse,
    aiCompliance: aiData.compliance,
    topicName: topic.name,
  };

  const newPost = await prisma.post.create({ data: addPost });

  res.status(200).send(newPost);
}
