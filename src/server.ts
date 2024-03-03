import express from "express";
import cors from "cors";
import { corsOptions } from "./config/corsOptions";

const PORT = 4002;

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Service Ok" });
});

app.listen(PORT, () => {
  console.log("App running on port: ", PORT);
});
