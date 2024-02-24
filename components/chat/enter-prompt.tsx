"use client";

import { sendMessage } from "@/actions/chat";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useLocalStorage } from "usehooks-ts";
import { CHAT_HISTORY_LS_PREFIX, DEFAULT_AI_PROMPT } from "@/lib/constants";
import { ChatMessage } from "@/types/Chat";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      aria-disabled={pending}
      className="w-24 ml-auto"
      disabled={pending}
    >
      {pending ? <Loader2 className="animate-spin" /> : "Start Chat"}
    </Button>
  );
}

export default function EnterPrompt({
  setGotNewResponse,
}: {
  setGotNewResponse: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [, setStoredChatHistory] = useLocalStorage<ChatMessage[]>(
    CHAT_HISTORY_LS_PREFIX,
    []
  );

  const sendMessageAsSystem = sendMessage.bind(null, [], "system");

  return (
    <div>
      <h2 className="mb-2 font-bold">What's your prompt?</h2>
      <form
        action={async formData => {
          const { message, response } = await sendMessageAsSystem(formData);
          setGotNewResponse(true);
          setStoredChatHistory([
            { role: "system", content: message },
            { role: response.role, content: response.content },
          ]);
        }}
        className="flex flex-col space-y-2"
      >
        <Input type="text" name="message" defaultValue={DEFAULT_AI_PROMPT} />
        <Submit />
      </form>
    </div>
  );
}
