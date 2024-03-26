import { Request, Response } from "express";
import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CSVLoader } from "langchain/document_loaders/fs/csv";

const chatModel = new ChatOllama({
  baseUrl: "http://localhost:11434", // Default value
  model: "llama2",
  temperature: 0.4,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are an expert agronomist from a company called Agrosat."],
  ["user", "{input}"],
]);

const outputParser = new StringOutputParser();

const chain = prompt.pipe(chatModel).pipe(outputParser);

export const ollamaChat = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;

    const chainResponse = await chain.invoke({ input: message });

    return res.status(200).json({ message: chainResponse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

export const ollamaFileAnalysis = async (req: Request, res: Response) => {
  try {
    const { message, column } = req.body;
    const search = [];

    if (column) search.push(column);

    const loader = new CSVLoader("./data/fmc_alertas.csv", "cultivo");
    const docs = await loader.load();

    return res.status(200).json({ message: docs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
