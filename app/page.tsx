import ChatContainer from "@/components/chat/chat-container";

export default function Home() {
  return (
    <main className="p-4 2xl:p-0 flex-1 flex flex-col justify-between space-y-4 2xl:max-w-[1024px] 2xl:m-auto w-full">
      <ChatContainer />
    </main>
  );
}
