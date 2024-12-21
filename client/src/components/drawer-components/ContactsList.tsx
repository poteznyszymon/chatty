import useGetContacts from "@/hooks/contacts/useGetContacts";
import { User } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import ContactTile from "./ContactTile";
import ContactsSkeleton from "./ContactsSkeleton";
import { Button } from "../ui/button";

const ContactsList = () => {
  const { contacts, isLoading, isRefetching, refetch, isError } =
    useGetContacts();

  return (
    <div>
      <div className="flex flex-col gap-3">
        <div className="flex text-muted-foreground items-center justify-between">
          <div className="flex items-center gap-1">
            <User />
            <p className="text-sm">Contacts</p>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="checkbox" />
            <label htmlFor="checkbox">
              <p className="t   ext-sm">Show online</p>
            </label>
            <p className="text-xs">(1 user)</p>
          </div>
        </div>
        <div className="overflow-y-scroll max-h-[calc(100vh-10rem)] flex flex-col gap-2">
          {(isLoading || isRefetching) &&
            !isError &&
            Array.from({ length: 12 }).map((_, i) => (
              <ContactsSkeleton key={i} />
            ))}
          {contacts &&
            !isError &&
            !isLoading &&
            contacts.map((contact) => (
              <ContactTile key={contact.id} contact={contact} />
            ))}
          {isError && (
            <div className="flex items-center justify-center">
              <p>Error while fetching contacts</p>
              <Button onClick={() => refetch()} className="ml-2">
                Retry
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
