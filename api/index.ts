import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { getUserProfileAndRepos } from "./getUserInfo.js";
import { analyzeGithubProfile } from "./gptControl.js";



const app = express();

dotenv.config();

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());



app.get("/api/user/:username", getUserProfileAndRepos);
app.get("/api/groq/:username", analyzeGithubProfile);

const PORT = process.env.PORT || 5000;

export default app;