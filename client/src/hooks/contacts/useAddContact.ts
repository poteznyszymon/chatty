import { User } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

const useAddContact = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { mutate: inviteContact, isPending: isLoading } = useMutation({
    mutationFn: async (contactId: number) => {
      const response = await fetch("/api/contacts/add-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contactId }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      return data.user;
    },
    onSuccess: async (contact: User) => {
      await queryClient.cancelQueries({
        queryKey: ["invitations"],
      });

      queryClient.setQueryData<User[]>(["invitations"], (oldData) => {
        return oldData ? [...oldData, contact] : [contact];
      });

      toast({
        description: "An invitation to contact has been sent",
      });
    },
  });

  return { inviteContact, isLoading };
};

export default useAddContact;
