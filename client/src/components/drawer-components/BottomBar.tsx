import useLogout from "@/hooks/useLogout";
import UserAvatar from "../shared/UserAvatar";
import { Button } from "../ui/button";

const BottomBar = ({ username }: { username: string }) => {
  const { logoutUser } = useLogout();
  return (
    <div className="flex w-full h-[3.8rem] items-center justify-between">
      <div className="flex items-center gap-3">
        <UserAvatar />
        <h1 className="font-semibold">{username}</h1>
      </div>
      <Button onClick={() => logoutUser()}>Logout</Button>
    </div>
  );
};

export default BottomBar;
