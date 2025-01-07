import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { User } from "@/types/user";
import { useLocation, useNavigate } from "react-router";

const useDeleteContact = () => {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutate: deleteContact, isPending: isLoading } = useMutation({
    mutationFn: async (contactId: number) => {
      const response = await fetch("/api/contacts/delete-contact", {
        method: "DELETE",
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
    onSuccess: async (deletedContact: User) => {
      queryClient.setQueryData<User[]>(["contacts"], (oldData) => {
        return oldData?.filter((item) => item.id !== deletedContact.id);
      });

      if (pathname == `/${deletedContact.username}`) {
        navigate("/");
      }

      toast({
        description: `${deletedContact.username} deleted from your contacts`,
      });
    },
  });

  return { deleteContact, isLoading };
};

export default useDeleteContact;
