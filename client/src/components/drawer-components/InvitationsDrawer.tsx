import { UseLayoutContext } from "@/context/LayoutContext";
import { cn } from "@/lib/utils";
import CustomTooltip from "../shared/CustomTooltip";
import { ArrowLeft } from "lucide-react";
import useGetInvitations from "@/hooks/contacts/useGetInvitations";
import ContactTile from "./ContactTile";
import ContactsSkeleton from "./ContactsSkeleton";

interface InvitationsDrawerProps {
  className?: string;
}

const InvitationsDrawer = ({ className }: InvitationsDrawerProps) => {
  const { isInvitationsOpen, setIsInvitationsOpen } = UseLayoutContext();
  const { invitations, isLoading } = useGetInvitations();

  return (
    <div
      className={cn(
        className,
        `px-3 duration-500 xl:duration-300 transition-all h-full fixed top-0 ${
          isInvitationsOpen ? "left-0" : "-left-[65rem] lg:-left-[26rem]"
        }`
      )}
    >
      <div className="flex-1 flex flex-col">
        <div className="w-full h-[3.5rem] flex gap-3 items-center">
          <CustomTooltip text="Back">
            <div
              onClick={() => setIsInvitationsOpen(false)}
              className="p-2 rounded-full text-muted-foreground flex items-center justify-center hover:bg-accent cursor-pointer"
            >
              <ArrowLeft className="size-6" />
            </div>
          </CustomTooltip>
          <h1 className="text-center font-medium mr-auto">Your invitations</h1>
        </div>
        <div className="overflow-y-scroll max-h-[calc(100vh-3.5rem)] flex flex-col gap-2">
          <div className="bg-accent px-3 py-3 text-sm text-muted-foreground ">
            <p className="text-sm">
              These are the invitations you've sent to other users. Once they
              accept your invitation, they will be automatically added to your
              contacts.
            </p>
          </div>
          {invitations &&
            invitations.map((item) => (
              <ContactTile key={item.id} contact={item} invitation />
            ))}
          {!invitations?.length && !isLoading && (
            <p className="text-muted-foreground mx-auto">
              No invitations sended
            </p>
          )}
          {isLoading &&
            Array.from({ length: 12 }).map((_, i) => (
              <ContactsSkeleton key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default InvitationsDrawer;
