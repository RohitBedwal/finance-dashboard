import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("Missing GROQ_API_KEY");
}

const groq = new Groq({ apiKey });

// llama-3.3-70b-versatile: fast, free, 30 req/min
const MODEL = "llama-3.3-70b-versatile";

export async function generateJSON(prompt, systemInstruction) {
  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemInstruction },
      { role: "user", content: prompt },
    ],
    temperature: 0.2,
    response_format: { type: "json_object" },
  });

  return JSON.parse(completion.choices[0].message.content);
}

export async function generateText(prompt, systemInstruction) {
  const completion = await groq.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: systemInstruction },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  return completion.choices[0].message.content;
}

export default groq;
