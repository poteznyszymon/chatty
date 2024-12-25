import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const useGetUserData = (username: string) => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ["user", `${username}`],
    queryFn: async () => {
      const response = await fetch(`/api/profile/${username}`);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data.user;
    },
  });

  return { user, isLoading };
};

export default useGetUserData;
