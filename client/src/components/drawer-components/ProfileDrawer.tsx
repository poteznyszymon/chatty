import { UseSettingsPage } from "@/context/SettingsPageContext";
import { cn } from "@/lib/utils";
import { ArrowLeft, AtSign, Check, Copy, Mail, Pen } from "lucide-react";
import UserAvatar from "../shared/UserAvatar";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ProfileDrawerProps {
  className?: string;
}

const ProfileDrawer = ({ className }: ProfileDrawerProps) => {
  const queryClient = useQueryClient();
  const { setIsProfileSettingsOpen } = UseSettingsPage();
  const user = queryClient.getQueryData<User>(["auth-user"]);
  const [isCopied, setIsCopied] = useState([false, false]);

  const handleCopy = async (idx: number, text: string) => {
    await navigator.clipboard.writeText(text);
    setIsCopied((prev) => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });
    setTimeout(() => {
      setIsCopied((prev) => {
        const updated = [...prev];
        updated[idx] = false;
        return updated;
      });
    }, 2000);
  };

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
            <UserAvatar className="size-32 " />
          </div>
          <div className="flex items-center gap-1 font-semibold text-lg">
            <p>{user?.firstName}</p>
            <p>{user?.secondName}</p>
          </div>
        </div>
        <div className="flex flex-col mt-10 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button className="justify-start group/email w-full">
                  <div
                    onClick={() => handleCopy(0, user?.email || "")}
                    className="flex items-center gap-10 hover:bg-accent  rounded-md p-2 px-5"
                  >
                    <Mail className="size-5 text-muted-foreground " />
                    <div className="flex items-start flex-col">
                      {user?.email}
                      <p className="text-muted-foreground text-sm">Email</p>
                    </div>
                    {isCopied[0] ? (
                      <Check className="size-5 hidden text-muted-foreground ml-auto group-hover/email:block" />
                    ) : (
                      <Copy className="size-5 hidden text-muted-foreground ml-auto group-hover/email:block" />
                    )}
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy email to clipboard</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <button className="justify-start group/username w-full">
                  <div
                    onClick={() => handleCopy(1, user?.username || "")}
                    className="flex items-center gap-10 hover:bg-accent rounded-md p-2 px-5"
                  >
                    <AtSign className="size-5 text-muted-foreground" />
                    <div className="flex items-start flex-col">
                      {user?.username}
                      <p className="text-muted-foreground text-sm">Username</p>
                    </div>
                    {isCopied[1] ? (
                      <Check className="size-5 hidden text-muted-foreground ml-auto group-hover/username:block" />
                    ) : (
                      <Copy className="size-5 hidden text-muted-foreground ml-auto group-hover/username:block" />
                    )}
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy username to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
