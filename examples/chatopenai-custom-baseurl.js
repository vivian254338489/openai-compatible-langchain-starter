import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

const apiKey = process.env.OPENAI_COMPATIBLE_API_KEY;
const baseURL = process.env.OPENAI_COMPATIBLE_BASE_URL;
const model = process.env.OPENAI_COMPATIBLE_MODEL || "gpt-4o-mini";

if (!apiKey || !baseURL) {
  throw new Error(
    "Set OPENAI_COMPATIBLE_API_KEY and OPENAI_COMPATIBLE_BASE_URL in .env before running this example.",
  );
}

const chat = new ChatOpenAI({
  apiKey,
  model,
  temperature: 0.2,
  configuration: {
    baseURL,
  },
});

const response = await chat.invoke([
  ["system", "You are concise and helpful."],
  ["human", "Reply with one sentence explaining what an OpenAI-compatible endpoint is."],
]);

console.log(response.content);
