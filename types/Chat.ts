import { openai } from "@/lib/openai";

export type ChatMessage = Parameters<
  typeof openai.chat.completions.create
>[0]["messages"][0];
