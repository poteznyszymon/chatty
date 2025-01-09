import useGetMessages from "@/hooks/messages/useGetMessages";
import { Loader2 } from "lucide-react";
import { useLocation, useParams } from "react-router";
import MessageComponent from "./MessageComponent";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/utils/socket";
import { Message } from "@/types/message";
import { useEffect } from "react";

const Messages = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["auth-user"]);
  const { messages, isLoading } = useGetMessages(username || "");
  const { pathname } = useLocation();

  useEffect(() => {
    const listener = ({
      senderUsername,
      message,
    }: {
      senderUsername: string;
      message: Message;
    }) => {
      if (senderUsername && message && pathname.slice(1) === senderUsername) {
        queryClient.setQueryData<Message[]>(
          ["messages", `${senderUsername}`],
          (oldData) => {
            return oldData ? [...oldData, message] : [message];
          }
        );
      }
    };

    socket?.on(`${user?.username}`, listener);

    return () => {
      socket?.off(`${user?.username}`, listener);
    };
  }, [pathname, user?.username, queryClient]);

  return (
    <div className="flex max-w-2xl h-full w-full items-end flex-col justify-end gap-2 px-2 xl:px-0  mt-[4rem]">
      {isLoading && <Loader2 className="size-6 animate-spin m-auto" />}
      {messages?.map((message) => (
        <MessageComponent
          sending={message.sending}
          key={message.id}
          message={message}
          myMessage={user?.id === message.senderId}
        />
      ))}
    </div>
  );
};

export default Messages;
