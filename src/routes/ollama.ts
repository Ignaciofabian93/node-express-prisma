import { Router } from "express";
import { ollamaChat, ollamaFileAnalysis } from "../controllers/ollama";

const ollamaRouter = Router();

ollamaRouter.route("/ollama_chat").post(ollamaChat);
ollamaRouter.route("/ollama_file").post(ollamaFileAnalysis);

export default ollamaRouter;
