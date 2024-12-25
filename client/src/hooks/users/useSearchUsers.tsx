import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useSearchUsers = (username: string) => {
  const {
    data: users,
    isLoading,
    isError,
    refetch,
    isFetching,
    isRefetching,
  } = useQuery<User[]>({
    queryKey: ["search-users"],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/search/${username}`);
        if (!response.ok) {
          return null;
        }
        const data = await response.json();
        if (data.users.length === 0) {
          return null;
        }
        return data.users;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return { users, isLoading, isError, refetch, isRefetching, isFetching };
};

export default useSearchUsers;
