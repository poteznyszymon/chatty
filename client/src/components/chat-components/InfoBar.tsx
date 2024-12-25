import { UseLayoutContext } from "@/context/LayoutContext";
import { X, AtSign } from "lucide-react";
import UserAvatar from "../shared/UserAvatar";
import useGetUserData from "@/hooks/users/useGetUserData";
import { useLocation } from "react-router";
import UserInfoTile from "../shared/UserInfoTile";
import { useActiveUsers } from "@/context/OnlineUsersContext";

const InfoBar = () => {
  const { isUserInfoOpen, setIsUserInfoOpen } = UseLayoutContext();
  const { pathname } = useLocation();
  const { user } = useGetUserData(pathname.slice(1));
  const { activeUsers } = useActiveUsers();

  return (
    <div
      className={`h-full shadow-lg px-3 items-center gap-3 flex flex-col w-[25rem] bg-card border-l duration-300 transition-all fixed ${
        isUserInfoOpen ? "right-0" : "-right-[25rem]"
      }`}
    >
      <div className="flex gap-5 h-[4rem] items-center mr-auto w-full">
        <div
          onClick={() => setIsUserInfoOpen(false)}
          className="p-2 hover:bg-accent rounded-full cursor-pointer text-muted-foreground"
        >
          <X />
        </div>
        <div className="flex items-center gap-1 text-lg font-semibold">
          <p>{user?.username}</p>
          <p>Info</p>
        </div>
      </div>
      <UserAvatar className="size-[9rem]" />
      <div className="flex flex-col  justify-center items-center text-lg">
        <div className="flex gap-2 items-center font-semibold">
          <p>{user?.firstName}</p>
          <p>{user?.secondName}</p>
        </div>
        <p className="text-muted-foreground text-sm">
          {activeUsers.includes(user?.id.toString() || "")
            ? "Online"
            : "Offline"}
        </p>
      </div>
      <UserInfoTile
        Icon={AtSign}
        title={user?.username || ""}
        subTitle="Username"
        toolTipText="Copy username to clipboard"
      />
    </div>
  );
};

export default InfoBar;
