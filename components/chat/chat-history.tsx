"use client";

import { sendMessage } from "@/actions/chat";
import classNames from "classnames";

export default function ChatHistory({
  chatHistory,
}: {
  chatHistory: Parameters<typeof sendMessage>[0];
}) {
  return (
    <div className="flex flex-col space-y-4">
      {chatHistory.map(({ content, role }, idx) => (
        <div
          key={idx}
          className={classNames(
            "py-3 rounded-md",
            role === "user" ? "bg-muted px-3" : ""
          )}
        >
          {content as any}
        </div>
      ))}
    </div>
  );
}
