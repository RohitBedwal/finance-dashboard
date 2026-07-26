import { withAuth } from "../_lib/auth.js";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { audio } = req.body;

    if (!audio) {
      return res.status(400).json({ message: "No audio data provided" });
    }

    const buffer = Buffer.from(audio, "base64");
    console.log("Audio buffer size:", buffer.length, "bytes");

    if (buffer.length < 2000) {
      return res.status(400).json({ message: "Audio too short. Hold the mic button and speak for at least 2 seconds." });
    }

    const file = new File([buffer], "recording.webm", { type: "audio/webm" });

    const transcription = await groq.audio.transcriptions.create({
      file,
      model: "whisper-large-v3",
      prompt: "Transcribe exactly what the person says. They may speak in Hindi, English, or a mix.",
      temperature: 0.0,
    });

    const text = transcription.text?.trim() || "";
    console.log("Whisper result:", text);

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Transcription error:", error.message);
    return res.status(500).json({ message: "Transcription failed: " + error.message });
  }
}

export default withAuth(handler);
