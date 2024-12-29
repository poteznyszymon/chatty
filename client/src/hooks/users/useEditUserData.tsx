import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProfileValues } from "../../../../src/validation/schemas";

const useEditUserData = () => {
  const queryClient = useQueryClient();
  const { mutate: editUser, isPending: isLoading } = useMutation({
    mutationFn: async (editData: editProfileValues) => {
      try {
        const response = await fetch("/api/edit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
  });

  return { editUser, isLoading };
};

export default useEditUserData;
