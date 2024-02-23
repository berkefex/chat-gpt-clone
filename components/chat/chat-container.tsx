"use client";

import { useReadLocalStorage } from "usehooks-ts";
import ChatHistory from "./chat-history";
import SendMessage from "./send-message";
import { sendMessage } from "@/actions/chat";
import { useOptimistic, useState } from "react";

export default function ChatContainer({}: {}) {
  const storedChatHistory =
    useReadLocalStorage<Parameters<typeof sendMessage>[0]>("chat-history", {
      initializeWithValue: false,
    }) || [];
  const [optimisticChatHistory, addOptimisticMessage] = useOptimistic(
    storedChatHistory,
    (chatHistory, newMessage: (typeof storedChatHistory)[number]) => [
      ...chatHistory,
      newMessage,
    ]
  );

  // for typewrite animation
  const [gotNewResponse, setGotNewResponse] = useState(false);

  return (
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
  );
}
