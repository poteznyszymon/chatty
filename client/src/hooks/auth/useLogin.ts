import { useMutation, useQueryClient } from "@tanstack/react-query";

import { connectSocket } from "@/utils/socket";
import { User } from "@/types/user";
import { loginValues } from "../../../../src/validation/schemas";
import { useToast } from "../use-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: loginUser, isPending: isLoading } = useMutation({
    mutationFn: async (userData: loginValues) => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        console.log(data);
        return data.user[0];
      } catch (error) {
        const errorMessage =
          (error as Error).message || "Unknown error occurred";
        throw new Error(errorMessage);
      }
    },
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      connectSocket(user.id.toString());
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: `${error.message}`,
      });
    },
  });

  return { loginUser, isLoading };
};

export default useLogin;
