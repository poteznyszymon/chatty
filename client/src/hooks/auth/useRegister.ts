import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";
import { registerValues } from "../../../../src/validation/schemas";
import { ConnectSocket } from "@/utils/socket";

const useRegister = () => {
  const queryClient = useQueryClient();
  const { mutate: registerUser, isPending: isLoading } = useMutation({
    mutationFn: async (userData: registerValues) => {
      try {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const data = await response.json();
        return data.user;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      ConnectSocket(user.id.toString());
    },
  });

  return { registerUser, isLoading };
};

export default useRegister;
