import { useState } from "react";
import useGetContacts from "@/hooks/contacts/useGetContacts";
import { Users } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import ContactTile from "./ContactTile";
import { useActiveUsers } from "@/context/OnlineUsersContext";
import ContactsSkeleton from "./ContactsSkeleton";

const ContactsList = () => {
  const { contacts, isError, isLoading } = useGetContacts();
  const { activeUsers } = useActiveUsers();
  const [showOnline, setShowOnline] = useState<boolean>(false);

  const filteredContacts = showOnline
    ? contacts?.filter((contact) => activeUsers.includes(contact.id.toString()))
    : contacts;

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex  items-center justify-between">
          <div className="flex items-center gap-1">
            <Users className="size-4" />
            <p className="text-sm">Contacts</p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Checkbox
              id="checkbox"
              checked={showOnline}
              onCheckedChange={(checked: boolean) => setShowOnline(checked)}
            />
            <label htmlFor="checkbox">
              <p className="text-sm">Show online</p>
            </label>
            <p className="text-xs">
              (
              {contacts?.filter((contact) =>
                activeUsers.includes(contact.id.toString())
              ).length || 0}{" "}
              users)
            </p>
          </div>
        </div>
        <div className="overflow-y-scroll max-h-[calc(100vh-10rem)] flex flex-col gap-2">
          {isLoading &&
            !isError &&
            Array.from({ length: 12 }).map((_, i) => (
              <ContactsSkeleton key={i} />
            ))}
          {filteredContacts &&
            !isError &&
            !isLoading &&
            filteredContacts.map((contact) => (
              <ContactTile key={contact.id} contact={contact} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
