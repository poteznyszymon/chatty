import useGetMessages from "@/hooks/messages/useGetMessages";
import { ArrowDown, Loader2 } from "lucide-react";
import { useLocation, useParams } from "react-router";
import MessageComponent from "./MessageComponent";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/utils/socket";
import { Message } from "@/types/message";
import { useEffect, useRef } from "react";
import { scrollToBottom } from "@/utils/scrollToBottom";
import useScrollPosition from "@/hooks/utils/useScrollPosition";
import useMaxScroll from "@/hooks/utils/useMaxScroll";

const Messages = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["auth-user"]);
  const { messages, isLoading } = useGetMessages(username || "");
  const { pathname } = useLocation();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { maxScroll } = useMaxScroll("messages-container");
  const { scrollPosition } = useScrollPosition("messages-container");
  const showScrollButton = scrollPosition < maxScroll - 400 && maxScroll > 0;

  useEffect(() => {
    const listener = async ({
      senderUsername,
      message,
    }: {
      senderUsername: string;
      message: Message;
    }) => {
      if (senderUsername && message && pathname.slice(1) === senderUsername) {
        queryClient.setQueryData<Message[]>(
          ["messages", `${senderUsername}`],
          (oldData) => (oldData ? [...oldData, message] : [message])
        );
      }
    };

    socket?.on(`${user?.username}`, listener);

    return () => {
      socket?.off(`${user?.username}`, listener);
    };
  }, [pathname, user?.username, queryClient]);

  useEffect(() => {
    scrollToBottom(messageEndRef);
  }, [username, messages]);

  return (
    <div
      id="messages-container"
      className="flex flex-col flex-1 max-h-full h-full mx-auto max-w-[43rem] overflow-y-scroll px-2 gap-1"
      ref={messageEndRef}
    >
      {isLoading && <Loader2 className="size-6 animate-spin m-auto" />}
      {messages?.map((message) => (
        <MessageComponent
          sending={message.sending}
          key={message.id}
          message={message}
          myMessage={user?.id === message.senderId}
        />
      ))}
      <div
        onClick={() => scrollToBottom(messageEndRef)}
        className={`absolute transition-all hover:scale-110 flex duration-300  cursor-pointer bg-primary top-[5rem] left-1/2 lg:left-[80rem] -translate-x-1/2  items-center justify-center rounded-full ${
          showScrollButton ? "size-[3rem]" : "size-0"
        } `}
      >
        <ArrowDown className="size-7 text-white" />
      </div>
    </div>
  );
};

export default Messages;
