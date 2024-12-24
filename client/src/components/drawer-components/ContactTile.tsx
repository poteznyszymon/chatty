import { Link, useLocation } from "react-router";
import UserAvatar from "../shared/UserAvatar";
import { useActiveUsers } from "@/context/OnlineUsersContext";
import { MoreVertical } from "lucide-react";

interface ContactTileProps {
  contact: {
    id: number;
    username: string;
  };
}

const ContactTile = ({ contact }: ContactTileProps) => {
  const { activeUsers } = useActiveUsers();
  const { pathname } = useLocation();

  return (
    <Link
      to={`${contact.username}`}
      className={`flex px-2 items-center gap-3 hover:bg-accent rounded-md p-1 group ${
        pathname.slice(1) === contact.username ? "bg-accent" : ""
      }`}
    >
      <UserAvatar
        className="size-10"
        online={activeUsers.includes(contact.id.toString())}
      />
      <div>
        <p>{contact.username}</p>
        <p className="text-sm text-muted-foreground">
          {activeUsers.includes(contact.id.toString()) ? "online" : "offline"}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="ml-auto p-1 group/box hover:bg-card rounded-full group-hover:flex hidden"
      >
        <MoreVertical className="text-muted-foreground group-hover/box:text-primary-foreground" />
      </button>
    </Link>
  );
};

export default ContactTile;
