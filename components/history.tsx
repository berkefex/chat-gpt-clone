"use client";

import { sendMessage } from "@/actions/chat";
import { useReadLocalStorage } from "usehooks-ts";

export default function History({}: {}) {
  const chatHistory = useReadLocalStorage<Parameters<typeof sendMessage>[0]>(
    "chat-history",
    { initializeWithValue: false }
  );

  return (
    <div className="flex flex-col space-y-4">
      {chatHistory?.map(({ content, role }, idx) => (
        <div key={idx}>
          {role}: {content as any}
        </div>
      ))}
    </div>
  );
}
