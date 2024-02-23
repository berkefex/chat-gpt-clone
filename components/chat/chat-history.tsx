"use client";

import { sendMessage } from "@/actions/chat";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

export default function ChatHistory({
  chatHistory,
}: {
  chatHistory: Parameters<typeof sendMessage>[0];
}) {
  const [response, setResponse] = useState<string>();
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const lastMessage = chatHistory[chatHistory.length - 1];
    if (lastMessage?.role !== "assistant") return;

    setTyping(true);

    const response = lastMessage?.content as string;

    (async () => {
      for (let word of response.split(" ")) {
        setResponse(response => `${response || ""} ${word}`);

        await new Promise(resolve => setTimeout(resolve, 80));
      }

      setTyping(false);
      setResponse(undefined);
    })();
  }, [chatHistory]);

  const lastMessageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({
      behavior: "instant",
      block: "end",
      inline: "end",
    });
  }, [chatHistory, response]);

  return (
    <div className="flex flex-col space-y-4">
      {chatHistory.map(({ content, role }, idx) => (
        <div
          key={idx}
          className={classNames(
            "py-3 rounded-md",
            role === "user" ? "bg-muted px-3" : ""
          )}
          {...(chatHistory.length - 1 === idx ? { ref: lastMessageRef } : {})}
        >
          {chatHistory.length - 1 === idx &&
          role === "assistant" &&
          typing &&
          response ? (
            <>
              {response}
              {typing && (
                <svg
                  viewBox="8 4 8 16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-black w-[1ch] inline-block animate-pulse"
                >
                  <rect x="10" y="6" width="4" height="12" />
                </svg>
              )}
            </>
          ) : (
            (content as any)
          )}
        </div>
      ))}
    </div>
  );
}
