import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useGetInvitations = () => {
  const {
    data: invitations,
    isPending: isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery<User[]>({
    queryKey: ["invitations"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/contacts/get-contacts-invitations");
        if (!response.ok) return null;
        const data = await response.json();
        return data.contactsRequests;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { invitations, isLoading, isError, refetch, isRefetching };
};

export default useGetInvitations;
