import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeclineInvitation = () => {
  const queryClient = useQueryClient();
  const { mutate: declineContact, isPending: isLoading } = useMutation({
    mutationFn: async (contactId: number) => {
      const response = await fetch(
        `/api/contacts/decline-contact/${contactId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.user;
    },
    onSuccess: async (declinedUser: User) => {
      console.log(declinedUser);
      queryClient.setQueryData<User[]>(["pendings"], (oldData) => {
        return oldData?.filter((item) => item.id !== declinedUser.id);
      });
    },
  });

  return { declineContact, isLoading };
};

export default useDeclineInvitation;
