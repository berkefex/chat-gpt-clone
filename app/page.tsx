import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="p-4">
      <form className="fixed left-4 right-4 bottom-4 flex flex-row items-center space-x-2">
        <Input type="text" name="message" />
        <Button type="submit">Send</Button>
      </form>
    </main>
  );
}
