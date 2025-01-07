import { useState } from "react";
import useGetContacts from "@/hooks/contacts/useGetContacts";
import { Clock, UserPlus, Users } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import ContactTile from "./ContactTile";
import { useActiveUsers } from "@/context/OnlineUsersContext";
import { Accordion } from "../ui/accordion";
import CustomAccordionItem from "../shared/CustomAccordionItem";
import useGetInvitations from "@/hooks/contacts/useGetInvitations";
import ContactsSkeleton from "./ContactsSkeleton";
import useGetPending from "@/hooks/contacts/useGetPending";

const ContactsList = () => {
  const { contacts, isError, isLoading } = useGetContacts();
  const { activeUsers } = useActiveUsers();
  const { invitations, isLoading: isInvitationsLoading } = useGetInvitations();
  const { pendings, isLoading: isPendingLoading } = useGetPending();
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
          <Accordion type="multiple">
            <CustomAccordionItem
              loading={isInvitationsLoading}
              Icon={UserPlus}
              text="Sent Invitations"
              length={invitations?.length || 0}
            >
              {invitations &&
                invitations.map((item) => (
                  <ContactTile key={item.id} contact={item} invitation />
                ))}
              {!invitations?.length && (
                <p className="text-muted-foreground">No invitations sended</p>
              )}
            </CustomAccordionItem>
            <CustomAccordionItem
              loading={isPendingLoading}
              Icon={Clock}
              text="Pending Invitations"
              length={pendings?.length || 0}
            >
              {pendings &&
                pendings.map((item) => (
                  <ContactTile key={item.id} contact={item} pending />
                ))}
              {!pendings?.length && (
                <p className="text-muted-foreground">No pending invitations</p>
              )}
            </CustomAccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default ContactsList;
