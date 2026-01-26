import Groq from "groq-sdk";


export async function runGroq(prompt: string): Promise<string> {
  const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: prompt,
      },   
    ],
  });

  return completion.choices[0]?.message?.content || "";
}
