import type { Request, Response } from "express";
import { runGroq } from "./groq";
import { buildPrompt } from "./builderPrompt";

export const analyzeGithubProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const response = await fetch(`http://localhost:5000/api/user/${username}`);

    if (!response.ok) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const { profile, repos } = await response.json();

    const prompt = buildPrompt(profile, repos);
    const aiText = await runGroq(prompt);

    res.json({
      character: aiText
        .split("\n")
        .find((l) => l.startsWith("Character:"))
        ?.replace("Character:", "")
        .trim(),
      analysis: aiText,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Groq analysis failed" });
  }
};
