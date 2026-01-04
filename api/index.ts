import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { getUserProfileAndRepos } from "./getUserInfo.js";
import { analyzeGithubProfile } from "./gptControl.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
}));

app.use(express.json());

app.get("/api/user/:username", getUserProfileAndRepos);
app.get("/api/groq/:username", analyzeGithubProfile);

export default app;