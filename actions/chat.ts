"use server";

import { z } from "zod";

const sendMessageSchema = z.object({
  message: z.string(),
});

export async function sendMessage(formData: FormData) {
  const validatedFields = sendMessageSchema.safeParse({
    message: formData.get("message"),
  });
  if (!validatedFields.success) throw new Error();

  const { message } = validatedFields.data;

  console.log(message);
}
