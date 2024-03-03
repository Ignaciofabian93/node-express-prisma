import { environment } from "./environment";

const whiteList = ["http://localhost:4000", "http://localhost:3000"];

export const corsOptions = {
  origin: environment === "development" ? whiteList : "https://www.example.com",
};
