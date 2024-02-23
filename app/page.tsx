import ChatContainer from "@/components/chat/chat-container";

export default function Home() {
  return (
    <main className="p-4 flex-1 flex flex-col justify-between space-y-6">
      <ChatContainer />
    </main>
  );
}
