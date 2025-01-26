import { Message } from "@/types/message";
import { useQuery } from "@tanstack/react-query";

const useGetMessages = (username: string) => {
  const {
    data: messages,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useQuery<Message[]>({
    queryKey: ["messages", `${username}`],
    refetchInterval: 1000 * 60,
    queryFn: async () => {
      const response = await fetch(`/api/messages/get-messages/${username}`);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data.messages;
    },
  });

  return { messages, isLoading, isError, isRefetching, refetch };
};

export default useGetMessages;
