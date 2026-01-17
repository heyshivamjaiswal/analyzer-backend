import type { Request, Response } from "express";

export const getUserProfileAndRepos = async (req: Request, res: Response) => {
  console.log("user is not reaching", req.params.username)
  try {
    const { username } = req.params;  
    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_API}`,
    };

    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,  
    });
   console.log("Display users",userRes)
    if (!userRes.ok) {
      res.status(userRes.status).json({ message: "User not found" });
      return;
    }

    const userData = await userRes.json();

    const profile = {
      name: userData.name,
      avatar_url: userData.avatar_url,
      bio: userData.bio,
      location: userData.location,
      followers: userData.followers,
      following: userData.following,
    };

    const repoRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated`,
      { headers }
    );
    const reposData = await repoRes.json();

    const repos = reposData.map((repo: any) => ({
      name: repo.name,
      html_url: repo.html_url,
      topics: repo.topics,
      description: repo.description,
      language: repo.language,
    }));

    res.json({ profile, repos });
  } catch {
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
};
