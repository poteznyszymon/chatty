import { Link } from "react-router";
import UserAvatar from "../shared/UserAvatar";

interface ContactTileProps {
  contact: {
    username: string;
  };
}

const ContactTile = ({ contact }: ContactTileProps) => {
  return (
    <Link
      to={`${contact.username}`}
      className="flex items-center gap-2 hover:bg-secondary rounded-md p-1"
    >
      <UserAvatar />
      <div>
        <p>{contact.username}</p>
        <p className="text-sm text-muted-foreground">offline</p>
      </div>
    </Link>
  );
};

export default ContactTile;
