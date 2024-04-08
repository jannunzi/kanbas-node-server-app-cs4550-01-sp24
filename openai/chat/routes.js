import OpenAI from "openai";
const openai = new OpenAI();

const chat = [];

export default function ChatCompletionRoutes(app) {
  const getChat = (req, res) => res.json(chat);
  app.get("/api/openai/chat", getChat);
  const postChat = async (req, res) => {
    const userMessage = req.body;
    chat.push(userMessage);
    const completion = await openai.chat.completions.create({
      messages: chat,
      model: "gpt-4",
    });
    const choice = completion.choices[0];
    chat.push(choice.message);
    res.json(choice.message);
  };
  app.post("/api/openai/chat", postChat);
}
