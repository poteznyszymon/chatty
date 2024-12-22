import { User } from "@/types/user";
import { ConnectSocket } from "@/utils/socket";
import { useQuery } from "@tanstack/react-query";

const useVerifyUser = () => {
  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["auth-user"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/my-profile");
        if (!response.ok) return null;
        const data = await response.json();
        ConnectSocket(data.user.id.toString());
        return data.user;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { user, isLoading };
};

export default useVerifyUser;
