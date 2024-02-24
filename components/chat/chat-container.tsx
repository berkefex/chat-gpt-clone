"use client";

import { useReadLocalStorage } from "usehooks-ts";
import ChatHistory from "./chat-history";
import SendMessage from "./send-message";
import { useOptimistic, useState } from "react";
import { CHAT_HISTORY_LS_PREFIX } from "@/lib/constants";
import type { ChatMessage } from "@/types/Chat";
import { Loader2 } from "lucide-react";
import EnterPrompt from "./enter-prompt";

export default function ChatContainer({}: {}) {
  const storedChatHistory = useReadLocalStorage<ChatMessage[]>(
    CHAT_HISTORY_LS_PREFIX,
    {
      initializeWithValue: false,
    }
  );
  const [optimisticChatHistory, addOptimisticMessage] = useOptimistic(
    storedChatHistory,
    (chatHistory, newMessage: ChatMessage) => [
      ...(chatHistory || []),
      newMessage,
    ]
  );

  // for typewrite animation
  const [gotNewResponse, setGotNewResponse] = useState(false);

  if (!optimisticChatHistory)
    return <Loader2 className="animate-spin mx-auto size-6" />;

  return optimisticChatHistory.length ? (
    <>
      <ChatHistory
        chatHistory={optimisticChatHistory}
        enableTypewriterAnimation={!!gotNewResponse}
      />
      <SendMessage
        addOptimisticMessage={addOptimisticMessage}
        setGotNewResponse={setGotNewResponse}
      />
    </>
  ) : (
    <EnterPrompt setGotNewResponse={setGotNewResponse} />
  );
}
