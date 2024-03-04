import express from "express";
import http from "http";
import cors from "cors";
import { corsOptions } from "./config/corsOptions";
import userRouter from "./routes/users";
import { config } from "dotenv";

config();

const PORT = process.env.PORT;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Service Ok" });
});

app.use("/api", userRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("App running on port: ", PORT);
});
