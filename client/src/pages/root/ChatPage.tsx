import ChatInput from "@/components/chat-components/ChatInput";
import InfoBar from "@/components/chat-components/InfoBar";
import Messages from "@/components/chat-components/Messages";
import Navbar from "@/components/chat-components/Navbar";
import { useParams } from "react-router";

const ChatPage = () => {
  const { username } = useParams();

  return (
    <main className="flex flex-col flex-1">
      <Navbar username={username || ""} />
      <div className="max-h-[calc(100vh-9rem)] h-full">
        <Messages />
      </div>
      <ChatInput />
      <InfoBar />
    </main>
  );
};

export default ChatPage;
