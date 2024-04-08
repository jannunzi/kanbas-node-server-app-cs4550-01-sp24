import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("./OpenAI/speech2text/speech.mp3"),
    model: "whisper-1",
  });

  console.log(transcription.text);
}
main();
