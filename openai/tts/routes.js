import fs from "fs";
import path, { join, dirname } from "path";
import { fileURLToPath } from "url";

import OpenAI from "openai";
const openai = new OpenAI();

const conversation = [];

export default function Text2SpeechRoutes(app) {
  const convertText2Speech = async (req, res) => {
    const { text } = req.body;
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });
    const timestamp = new Date().getTime();
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const speech = `speech-${timestamp}.mp3`;
    const speechFile = join(__dirname, speech);

    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    conversation.push({
      text,
      speech,
    });
    res.json(conversation);
  };
  app.post("/api/openai/tts", convertText2Speech);
  app.get("/api/openai/tts", (req, res) => res.json(conversation));
}
