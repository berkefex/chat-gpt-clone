"use server";

import { openai } from "@/lib/openai";
import type { ChatCompletionMessageParam } from "openai/src/resources/index.js";
import { z } from "zod";

const sendMessageSchema = z.object({
  message: z.string(),
});

export async function sendMessage(
  history: ChatCompletionMessageParam[],
  formData: FormData
) {
  const validatedFields = sendMessageSchema.safeParse({
    message: formData.get("message"),
  });
  if (!validatedFields.success) throw new Error();

  const { message } = validatedFields.data;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      ...history,
      { role: "user", content: message },
    ],
    model: "gpt-3.5-turbo",
  });

  return { message, response: completion.choices[0].message };
}
