import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Hello World!" }],
    model: "gpt-4-0125-preview",
  });

  console.log(completion.choices[0]);
}

main();
