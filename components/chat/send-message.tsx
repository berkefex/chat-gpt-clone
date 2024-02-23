"use client";

import { sendMessage } from "@/actions/chat";
import { Input } from "../ui/input";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { ChatCompletionMessageParam } from "openai/src/resources/index.js";
import { useRef } from "react";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} className="w-20">
      {pending ? <Loader2 className="animate-spin" /> : "Send"}
    </Button>
  );
}

export default function SendMessage({
  addOptimisticMessage,
  setGotNewResponse,
}: {
  addOptimisticMessage: (message: ChatCompletionMessageParam) => void;
  setGotNewResponse: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [chatHistory, setChatHistory] = useLocalStorage<
    Parameters<typeof sendMessage>[0]
  >("chat-history", []);
  const sendMessageWithHistory = sendMessage.bind(null, chatHistory);

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async formData => {
        formRef.current?.reset();

        // will removed after end of the operation
        addOptimisticMessage({
          role: "user",
          content: formData.get("message") as any,
        });

        const { message, response } = await sendMessageWithHistory(formData);
        setGotNewResponse(true);
        setChatHistory(chatHistory => [
          ...chatHistory,
          { role: "user", content: message },
          { role: response.role, content: response.content },
        ]);
      }}
      ref={formRef}
      className="sticky left-4 right-4 bottom-4 flex flex-row items-center space-x-2"
    >
      <Input type="text" name="message" />
      <Submit />
    </form>
  );
}