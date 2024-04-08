import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Describe this image" },
          {
            type: "image_url",
            image_url: {
              url: "https://media.wired.com/photos/5c6f46d93e8add2cdb917279/master/w_2400,c_limit/spaceshuttle.jpg",
            },
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}
main();
