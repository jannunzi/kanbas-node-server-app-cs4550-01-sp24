import fs from "fs";
import { join } from "path";
import { readdir } from "fs/promises";

import OpenAI from "openai";

const openai = new OpenAI();

export default function SpeechToTextRoutes(app) {
  const transcription = async (req, res) => {
    const { audioFile } = req.params;
    const filePath = join("openai", "tts", audioFile);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-1",
    });
    res.send(transcription.text);
  };
  const listAudioFiles = async (req, res) => {
    const directoryPath = join(process.cwd(), "openai", "tts");

    try {
      const files = await readdir(directoryPath);
      console.log(files);
      const mp3Files = files.filter((file) => file.endsWith(".mp3"));
      res.json(mp3Files);
    } catch (error) {
      console.error("Error reading directory:", error);
      res.status(500).send("Failed to list audio files.");
    }
  };
  app.get("/api/openai/audio", listAudioFiles);
  app.get("/api/openai/audio/transcribe/:audioFile", transcription);
}
