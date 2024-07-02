const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

const nameConversation = async (messages) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "In less than 5 words, name this conversation.",
      },
      ...messages,
    ],
  });

  return response.choices[0].message.content;
};

module.exports = nameConversation;