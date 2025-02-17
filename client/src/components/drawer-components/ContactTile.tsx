import { Link, useLocation } from "react-router";
import UserAvatar from "../shared/UserAvatar";
import { useActiveUsers } from "@/context/OnlineUsersContext";
import { UseLayoutContext } from "@/context/LayoutContext";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Check, UserMinus, X } from "lucide-react";
import { Button } from "../ui/button";
import useAcceptContact from "@/hooks/contacts/useAcceptContact";
import useDeleteContact from "@/hooks/contacts/useDeleteContact";
import useDeclineInvitation from "@/hooks/contacts/useDeclineInvitation";

interface ContactTileProps {
  contact: {
    id: number;
    username: string;
    imageUrl: string | null;
  };
  invitation?: boolean;
  pending?: boolean;
}

const ContactTile = ({ contact, invitation, pending }: ContactTileProps) => {
  const { activeUsers } = useActiveUsers();
  const { pathname } = useLocation();
  const { setIsUserInfoOpen } = UseLayoutContext();
  const { acceptContact } = useAcceptContact();
  const { deleteContact } = useDeleteContact();
  const { declineContact } = useDeclineInvitation();

  return (
    <>
      {invitation ? (
        <div className="flex px-2 py-2 items-center gap-3 rounded-md p-1">
          <UserAvatar
            url={contact.imageUrl || ""}
            className="size-10"
            online={activeUsers.includes(contact.id.toString())}
          />
          <div>
            <p>{contact.username}</p>
            <p className="text-sm text-muted-foreground">
              {activeUsers.includes(contact.id.toString())
                ? "online"
                : "offline"}
            </p>
          </div>
        </div>
      ) : pending ? (
        <div className="flex px-2 py-2 items-center gap-3 rounded-md p-1">
          <UserAvatar
            url={contact.imageUrl || ""}
            className="size-10"
            online={activeUsers.includes(contact.id.toString())}
          />
          <div>
            <p>{contact.username}</p>
            <p className="text-sm text-muted-foreground">
              {activeUsers.includes(contact.id.toString())
                ? "online"
                : "offline"}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div
              className="p-1 hover:bg-accent rounded-md cursor-pointer"
              onClick={() => acceptContact(contact.id)}
            >
              <Check className="size-5" />
            </div>
            <div
              className="p-1 hover:bg-red-500 rounded-md cursor-pointer"
              onClick={() => declineContact(contact.id)}
            >
              <X className="size-5" />
            </div>
          </div>
        </div>
      ) : (
        <ContextMenu>
          <ContextMenuTrigger>
            <Link
              onClick={() => {
                setIsUserInfoOpen(false);
              }}
              to={`${contact.username}`}
              className={`flex px-2 py-3 items-center gap-3 hover:text-white hover:bg-primary rounded-md p-1 group ${
                pathname.slice(1) === contact.username
                  ? "bg-primary text-white"
                  : ""
              }`}
            >
              <UserAvatar
                url={contact.imageUrl || ""}
                className="size-10"
                online={activeUsers.includes(contact.id.toString())}
              />
              <div>
                <p>{contact.username}</p>
                <div
                  className={`text-sm text-muted-foreground group-hover:text-white ${
                    pathname.slice(1) === contact.username ? "text-white" : ""
                  }`}
                >
                  {activeUsers.includes(contact.id.toString())
                    ? "online"
                    : "offline"}
                </div>
              </div>
            </Link>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <Button
              onClick={() => deleteContact(contact.id)}
              variant={"destructive"}
              className="flex items-center gap-2"
            >
              <p>Delete contact </p>
              <UserMinus className="size-4" />
            </Button>
          </ContextMenuContent>
        </ContextMenu>
      )}
    </>
  );
};

export default ContactTile;
