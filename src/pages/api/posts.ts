// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).send({
    postId: 1,
    user: {
      userId: 1,
      userName: "user",
      firstName: "Derek",
      lastName: "McEnroe",
    },
    fact: "this is true",
    articleURL: "cnn.com/article",
    host: "cnn.com",
    truthVotes: { green: 5, yellow: 2, red: 1 },
    comments: [],
  });
}
