import UserAvatar from "../shared/UserAvatar";
import { UseLayoutContext } from "@/context/LayoutContext";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";

const BottomBar = () => {
  const { setIsProfileSettingsOpen } = UseLayoutContext();
  const { data: user } = useQuery<User | null>({ queryKey: ["auth-user"] });

  return (
    <div className="flex w-full h-[3.8rem] items-center justify-between">
      <div
        onClick={() => setIsProfileSettingsOpen(true)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <UserAvatar url={user?.imageUrl || ""} className="size-10" />
        <div className="flex gap-1">
          <p className="text text-muted-foreground">Logged as</p>
          <h1 className="">{user?.username}</h1>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
