import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

const useAcceptContact = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: acceptContact, isPending: isLoading } = useMutation({
    mutationFn: async (contactId: number) => {
      console.log(contactId);
      const response = await fetch(
        `/api/contacts/verify-contact/${contactId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.newContact;
    },
    onSuccess: async (newContact: User) => {
      queryClient.setQueryData<User[]>(["pendings"], (oldData) => {
        return oldData?.filter((item) => item.id !== newContact.id);
      });

      queryClient.setQueryData<User[]>(["contacts"], (oldData) => {
        return oldData ? [...oldData, newContact] : [newContact];
      });

      toast({
        description: `${newContact.username} added to you contacts`,
      });
    },
  });

  return { acceptContact, isLoading };
};

export default useAcceptContact;
