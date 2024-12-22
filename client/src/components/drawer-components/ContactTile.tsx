import { Link } from "react-router";
import UserAvatar from "../shared/UserAvatar";
import { useActiveUsers } from "@/context/OnlineUsersContext";

interface ContactTileProps {
  contact: {
    id: number;
    username: string;
  };
}

const ContactTile = ({ contact }: ContactTileProps) => {
  const { activeUsers } = useActiveUsers();

  return (
    <Link
      to={`${contact.username}`}
      className="flex items-center gap-2 hover:bg-secondary rounded-md p-1"
    >
      <UserAvatar online={activeUsers.includes(contact.id.toString())} />
      <div>
        <p>{contact.username}</p>
        <p className="text-sm text-muted-foreground">
          {activeUsers.includes(contact.id.toString()) ? "online" : "offline"}
        </p>
      </div>
    </Link>
  );
};

export default ContactTile;
