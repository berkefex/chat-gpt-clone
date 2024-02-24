"use client";

import { sendMessage } from "@/actions/chat";
import { Input } from "../ui/input";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import type { ChatMessage } from "@/types/Chat";
import { CHAT_HISTORY_LS_PREFIX } from "@/lib/constants";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className="w-20"
      disabled={pending}
    >
      {pending ? <Loader2 className="animate-spin" /> : "Send"}
    </Button>
  );
}

export default function SendMessage({
  addOptimisticMessage,
  setGotNewResponse,
}: {
  addOptimisticMessage: (message: ChatMessage) => void;
  setGotNewResponse: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [chatHistory, setChatHistory] = useLocalStorage<
    Parameters<typeof sendMessage>[0]
  >(CHAT_HISTORY_LS_PREFIX, []);
  const sendMessageWithHistory = sendMessage.bind(null, chatHistory, "user");

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      action={async formData => {
        const message = formData.get("message");
        if (!message) return;

        formRef.current?.reset();

        // will removed after end of the operation
        addOptimisticMessage({
          role: "user",
          content: message as any,
        });

        try {
          const { message, response } = await sendMessageWithHistory(formData);
          setGotNewResponse(true);
          setChatHistory(chatHistory => [
            ...chatHistory,
            { role: "user", content: message },
            { role: response.role, content: response.content },
          ]);
        } catch (err) {
          console.log(err);
        }
      }}
      ref={formRef}
      className="sticky left-4 right-4 bottom-4 flex flex-row items-center space-x-2"
    >
      <Input type="text" name="message" />
      <Submit />
    </form>
  );
}
