import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const translation = await openai.audio.translations.create({
    file: fs.createReadStream("/path/to/file/german.mp3"),
    model: "whisper-1",
  });

  console.log(translation.text);
}
main();
