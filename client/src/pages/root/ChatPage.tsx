import ChatInput from "@/components/chat-components/ChatInput";
import InfoBar from "@/components/chat-components/InfoBar";
import Messages from "@/components/chat-components/Messages";
import Navbar from "@/components/chat-components/Navbar";
import useGetContacts from "@/hooks/contacts/useGetContacts";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router";

const ChatPage = () => {
  const { username } = useParams();
  const { contacts, isError, isLoading } = useGetContacts();

  const userInContacts = contacts?.some(
    (contact) => contact.username === username
  );

  return (
    <main className="flex flex-col flex-1">
      <Navbar username={username || ""} />
      {!isLoading && !isError && userInContacts && (
        <>
          <div className="max-h-[calc(100vh-9rem)] h-full">
            <Messages />
            <ChatInput />
          </div>
          <InfoBar />
        </>
      )}
      {!userInContacts && !isLoading && (
        <div className="flex items-center justify-center h-full">
          <p className="text-center text-muted-foreground">
            User not found in contacts.
          </p>
        </div>
      )}
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </main>
  );
};

export default ChatPage;
