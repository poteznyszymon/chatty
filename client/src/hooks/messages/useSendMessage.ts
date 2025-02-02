import { Message } from "@/types/message";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { User } from "@/types/user";

interface useSendMessageOptions {
  onSucess?: () => void;
}

const useSendMessage = (
  username: string,
  content: string,
  options: useSendMessageOptions,
  image?: string
) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const user = queryClient.getQueryData<User>(["auth-user"]);

  const { mutate: sendMessage, isPending: isLoading } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/messages/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, content, image }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.data;
    },
    onMutate: async () => {
      if (!username) return;

      await queryClient.cancelQueries({
        queryKey: ["messages", `${username}`],
      });

      const previusMessages = queryClient.getQueryData<Message[]>([
        "messages",
        `${username}`,
      ]);

      const tempMessage: Message = {
        id: Math.random(),
        content,
        senderId: user?.id || 0,
        receiverId: Math.random(),
        sentAt: new Date().toISOString(),
        image: image ? image : null,
        sending: true,
      };

      console.log(tempMessage);

      queryClient.setQueryData<Message[]>(
        ["messages", `${username}`],
        (oldData) => {
          return oldData ? [tempMessage, ...oldData] : [tempMessage];
        }
      );

      return { previusMessages };
    },
    onError: (_error, username, context) => {
      if (context?.previusMessages) {
        queryClient.setQueryData<Message[]>(
          ["messages", `${username}`],
          context.previusMessages
        );
      }
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: async (newMessage: Message) => {
      if (options.onSucess) {
        options.onSucess();
      }
      await queryClient.cancelQueries({
        queryKey: ["messages", `${username}`],
      });
      queryClient.setQueryData<Message[]>(
        ["messages", `${username}`],
        (oldData) => {
          return oldData
            ? [newMessage, ...oldData.filter((msg) => !msg.sending)]
            : [newMessage];
        }
      );
    },
  });

  return { sendMessage, isLoading };
};

export default useSendMessage;
