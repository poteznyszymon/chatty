import useLogout from "@/hooks/auth/useLogout";
import UserAvatar from "../shared/UserAvatar";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const BottomBar = ({ username }: { username: string }) => {
  const { logoutUser, isLoading } = useLogout();
  return (
    <div className="flex w-full h-[3.8rem] items-center justify-between">
      <div className="flex items-center gap-3">
        <UserAvatar />
        <h1 className="font-semibold">{username}</h1>
      </div>
      <Button
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
