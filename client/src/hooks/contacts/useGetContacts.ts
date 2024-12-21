import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useGetContacts = () => {
  const {
    data: contacts,
    isPending: isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery<User[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/contacts");
        if (!response.ok) return null;
        const data = await response.json();
        return data.contacts;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { contacts, isLoading, isError, refetch, isRefetching };
};

export default useGetContacts;
