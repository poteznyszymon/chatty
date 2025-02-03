import { UseLayoutContext } from "@/context/LayoutContext";
import { cn } from "@/lib/utils";
import CustomTooltip from "../shared/CustomTooltip";
import { ArrowLeft } from "lucide-react";
import useGetPending from "@/hooks/contacts/useGetPending";
import ContactTile from "./ContactTile";
import ContactsSkeleton from "./ContactsSkeleton";

interface PendingDrawerProps {
  className?: string;
}

const PendingDrawer = ({ className }: PendingDrawerProps) => {
  const { isPendingsOpen, setIsPendingsOpen } = UseLayoutContext();
  const { pendings, isLoading } = useGetPending();

  return (
    <div
      className={cn(
        className,
        `px-3 duration-500 xl:duration-300 transition-all h-full fixed top-0 ${
          isPendingsOpen ? "left-0" : "-left-[65rem] lg:-left-[26rem]"
        }`
      )}
    >
      <div className="flex-1 flex flex-col">
        <div className="w-full h-[3.5rem] flex gap-3 items-center">
          <CustomTooltip text="Back">
            <div
              onClick={() => setIsPendingsOpen(false)}
              className="p-2 rounded-full text-muted-foreground flex items-center justify-center hover:bg-accent cursor-pointer"
            >
              <ArrowLeft className="size-6" />
            </div>
          </CustomTooltip>
          <h1 className="text-center font-medium mr-auto">
            Your pending invitations
          </h1>
        </div>
        <div className="overflow-y-scroll max-h-[calc(100vh-3.5rem)] flex flex-col gap-2">
          <div className="bg-accent px-3 py-3 text-sm text-muted-foreground ">
            <p className="text-sm">
              These are invitations sent to you by other users. You can either{" "}
              <span className="font-semibold">accept</span> or{" "}
              <span className="font-semibold">decline</span> them.
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>
                If you accept, the user will be{" "}
                <span className="font-semibold">added</span> to your contacts.
              </li>
              <li>
                If you decline, the invitation will be{" "}
                <span className="font-semibold">removed</span>.
              </li>
            </ul>
          </div>
          {pendings &&
            pendings.map((pending) => (
              <ContactTile key={pending.id} contact={pending} pending />
            ))}
          {!pendings?.length && !isLoading && (
            <p className="text-muted-foreground mx-auto">
              No pending invitations
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

export default PendingDrawer;
