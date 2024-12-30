import ChatInput from "@/components/chat-components/ChatInput";
import InfoBar from "@/components/chat-components/InfoBar";
import Navbar from "@/components/chat-components/Navbar";
import { useParams } from "react-router";

const ChatPage = () => {
  const { username } = useParams();

  return (
    <main className="flex flex-1">
      <div className="flex-1 flex flex-col duration-300 transition-all">
        <Navbar username={username || ""} />
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="flex max-w-2xl h-full w-full"></div>
          <ChatInput />
        </div>
      </div>
      <InfoBar />
    </main>
  );
};

export default ChatPage;
