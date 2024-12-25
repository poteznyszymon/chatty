import { cn } from "@/lib/utils";
import { ArrowLeft, Mail, Pen, AtSign } from "lucide-react";
import UserAvatar from "../shared/UserAvatar";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { UseLayoutContext } from "@/context/LayoutContext";
import UserInfoTile from "../shared/UserInfoTile";

interface ProfileDrawerProps {
  className?: string;
}

const ProfileDrawer = ({ className }: ProfileDrawerProps) => {
  const queryClient = useQueryClient();
  const { setIsProfileSettingsOpen } = UseLayoutContext();
  const user = queryClient.getQueryData<User>(["auth-user"]);

  return (
    <div className={cn(className, "px-3")}>
      <div className="flex-1 flex flex-col">
        <div className="w-full h-[3.5rem] flex gap-3 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div
                  onClick={() => setIsProfileSettingsOpen(false)}
                  className="p-2 rounded-full text-muted-foreground flex items-center justify-center hover:bg-secondary cursor-pointer"
                >
                  <ArrowLeft />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Back</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <h1 className="text-center font-medium mr-auto">Profile</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="p-2 ml-auto rounded-full text-muted-foreground flex items-center justify-center hover:bg-secondary cursor-pointer">
                  <Pen className="size-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col items-center gap-3 mt-5">
          <div className="overflow-hidden rounded-full cursor-pointer ">
            <UserAvatar className="size-[9rem] " />
          </div>
          <div className="flex items-center gap-1 font-semibold text-lg">
            <p>{user?.firstName}</p>
            <p>{user?.secondName}</p>
          </div>
        </div>
        <div className="flex flex-col mt-10 gap-2">
          <UserInfoTile
            Icon={Mail}
            title={user?.email || ""}
            subTitle={"Email"}
            toolTipText="Copy email to clipboard"
          />
          <UserInfoTile
            Icon={AtSign}
            title={user?.username || ""}
            subTitle={"Username"}
            toolTipText="Copy username to clipboard"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
