import ollama from "ollama";
// import { ChatOllama } from "@langchain/community/chat_models/ollama";
// import { HumanMessage } from "@langchain/core/messages";
// import { ChatPromptTemplate } from "@langchain/core/prompts";
// import { Ollama } from "@langchain/community/llms/ollama";

const modelfile = `FROM llama2 SYSTEM "You are an expert agronomist, you work at Agrosat company and you offer technological solutions to the agronomic industry"`;

// const ollama = new ({
//   model: modelfile,
//   temperature: 0.7,
// });

// const prompt = ChatPromptTemplate.fromMessages([
//   [
//     "assistant",
//     `You are an expert agronomist from Agrosat company. Format all responses as JSON objects`,
//   ],
//   ["human", `"{input}"`],
// ]);

// const ollama_model = new ChatOllama({
//   baseUrl: "http://localhost:11434",
//   model: "llava",
//   format: "json",
// });

async function ollama_init() {
  return await ollama.create({ model: "llama2", modelfile: modelfile });
}

export const ollama_instance = () => ollama_init().then(() => ollama);
