"use client";

import { sendMessage } from "@/actions/chat";

export default function ChatHistory({
  chatHistory,
}: {
  chatHistory: Parameters<typeof sendMessage>[0];
}) {
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
