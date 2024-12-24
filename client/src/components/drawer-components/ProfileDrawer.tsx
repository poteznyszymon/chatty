import { UseSettingsPage } from "@/context/SettingsPageContext";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import UserAvatar from "../shared/UserAvatar";

interface ProfileDrawerProps {
  className?: string;
}

const ProfileDrawer = ({ className }: ProfileDrawerProps) => {
  const { setIsProfileSettingsOpen } = UseSettingsPage();

  return (
    <div className={cn(className, "px-3")}>
      <div className="flex-1 flex flex-col">
        <div className="w-full h-[3.5rem] flex gap-3 items-center">
          <div
            onClick={() => setIsProfileSettingsOpen(false)}
            className="p-2 rounded-full text-muted-foreground flex items-center justify-center hover:bg-secondary cursor-pointer"
          >
            <ArrowLeft />
          </div>
          <h1 className="text-center font-medium">Profile</h1>
        </div>
        <div className="flex flex-col items-center">
          <UserAvatar className="size-28" />
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
