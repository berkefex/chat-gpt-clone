import History from "@/components/history";
import SendMessage from "@/components/send-message";

export default function Home() {
  return (
    <main className="p-4 flex-1 flex flex-col justify-between space-y-6">
      <History />
      <SendMessage />
    </main>
  );
}
