import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useGetPending = () => {
  const {
    data: pendings,
    isPending: isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery<User[]>({
    queryKey: ["pendings"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/contacts/get-contacts-pending");
        if (!response.ok) return null;
        const data = await response.json();
        return data.contactsPending;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { pendings, isLoading, isError, refetch, isRefetching };
};

export default useGetPending;
