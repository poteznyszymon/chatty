import useLogout from "@/hooks/auth/useLogout";
import UserAvatar from "../shared/UserAvatar";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { UseLayoutContext } from "@/context/LayoutContext";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";

const BottomBar = () => {
  const { setIsProfileSettingsOpen } = UseLayoutContext();
  const { data: user } = useQuery<User | null>({ queryKey: ["auth-user"] });

  const { logoutUser, isLoading } = useLogout();
  return (
    <div className="flex w-full h-[3.8rem] items-center justify-between">
      <div
        onClick={() => setIsProfileSettingsOpen(true)}
        className="flex items-center gap-3 cursor-pointer"
      >
        <UserAvatar url={user?.imageUrl || ""} className="size-10" />
        <h1 className="font-semibold">{user?.username}</h1>
      </div>
      <Button
        variant={"secondary"}
        disabled={isLoading}
        className="w-20"
        onClick={() => logoutUser()}
      >
        {isLoading ? <Loader2 className="size-6 animate-spin" /> : "Logout"}
      </Button>
    </div>
  );
};

export default BottomBar;
