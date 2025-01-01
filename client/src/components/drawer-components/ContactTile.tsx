import { Link, useLocation } from "react-router";
import UserAvatar from "../shared/UserAvatar";
import { useActiveUsers } from "@/context/OnlineUsersContext";
import { UseLayoutContext } from "@/context/LayoutContext";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { UserMinus } from "lucide-react";
import { Button } from "../ui/button";

interface ContactTileProps {
  contact: {
    id: number;
    username: string;
    imageUrl: string | null;
  };
}

const ContactTile = ({ contact }: ContactTileProps) => {
  const { activeUsers } = useActiveUsers();
  const { pathname } = useLocation();
  const { setIsUserInfoOpen } = UseLayoutContext();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Link
          onClick={() => setIsUserInfoOpen(false)}
          to={`${contact.username}`}
          className={`flex px-2 items-center gap-3 hover:bg-accent rounded-md p-1 group ${
            pathname.slice(1) === contact.username ? "bg-accent" : ""
          }`}
        >
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
        </Link>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <Button variant={"destructive"} className="flex items-center gap-2">
          <p>Delete contact </p>
          <UserMinus className="size-4" />
        </Button>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ContactTile;
