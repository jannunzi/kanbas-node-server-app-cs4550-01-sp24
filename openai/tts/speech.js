import fs from "fs";
import path from "path";
import OpenAI from "openai";
const openai = new OpenAI();
async function main() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: "Today is a wonderful day to build something people love!",
  });
  const timestamp = new Date().getTime();
  const speechFile = path.resolve(
    `./openai/text2speech/speech-${timestamp}.mp3`
  );
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
}
main();
