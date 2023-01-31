// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const { Configuration, OpenAIApi } = require("openai");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  //"Give me True/False, Subjective/Objective, and explanation in an array"
  //"Provide general category of the following statement:"

  const openai = new OpenAIApi(configuration);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
<<<<<<< HEAD
    prompt: [
      "Give me True/False, Subjective/Objective, and explanation in an array " +
        req.body +
        "\nA:",
      "Provide general category of the following statement:" +
        req.body +
        "\nA:",
    ],
=======
    prompt:
      // "Provide context to the validity of the following statement as well as true or false: " +
      // "Give me True/False, Subjective/Objective, journalism category, and explanation of the following statement:" +
      "Provide general category of the following statement: " +
      req.body +
      "\nA:",
>>>>>>> main
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ["\n"],
  });

  res.status(200).send(response.data);
}
