import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import useLogout from "@/hooks/useLogout";

interface DrawerProps {
  className?: string;
}

const Drawer = ({ className }: DrawerProps) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["auth-user"]);
  const { logoutUser } = useLogout();

  return (
    <div className={cn(className, "p-3")}>
      <div className="flex-1 ">xd</div>
      <div className="flex w-full h-[3rem] items-center justify-between">
        <div className="flex items-center gap-4">
          <UserAvatar />
          <h1 className="font-semibold">logged as {user?.username}</h1>
        </div>
        <Button onClick={() => logoutUser()}>Logout</Button>
      </div>
    </div>
  );
};

export default Drawer;
