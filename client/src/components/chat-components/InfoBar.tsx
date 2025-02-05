import { UseLayoutContext } from "@/context/LayoutContext";
import { X, AtSign } from "lucide-react";
import UserAvatar from "../shared/UserAvatar";
import useGetUserData from "@/hooks/users/useGetUserData";
import { useLocation } from "react-router";
import UserInfoTile from "../shared/UserInfoTile";
import { useActiveUsers } from "@/context/OnlineUsersContext";
import { formatRelativeDate } from "@/lib/relativeDate";

const InfoBar = () => {
  const { isUserInfoOpen, setIsUserInfoOpen } = UseLayoutContext();
  const { pathname } = useLocation();
  const { user, isLoading } = useGetUserData(pathname.slice(1));
  const { activeUsers } = useActiveUsers();

  const isUserOnline = activeUsers.includes(user?.id.toString() || "");

  return (
    <div
      className={`h-full shadow-lg z-30 px-3 items-center gap-5 flex flex-col w-full md:w-[25rem] bg-card border-l duration-300 transition-all fixed ${
        isUserInfoOpen ? "right-0" : "-right-[50rem] md:-right-[25rem]"
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
          {!isLoading ? (
            <>
              <p>{user?.username}</p>
              <p>Info</p>
            </>
          ) : (
            <div className="w-32 h-4 rounded-md animate-pulse bg-accent" />
          )}
        </div>
      </div>
      <UserAvatar url={user?.imageUrl || ""} className="size-[9rem]" />
      <div className="flex flex-col  justify-center items-center text-lg">
        <div className="flex gap-2 items-center font-semibold">
          {!isLoading ? (
            <>
              <p>{user?.firstName}</p>
              <p>{user?.secondName}</p>
            </>
          ) : (
            <div className="w-32 h-6 rounded-md animate-pulse bg-accent" />
          )}
        </div>
        {!isLoading ? (
          <div className="flex flex-col gap-3 items-center">
            {isUserOnline ? (
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500" />
                <p className="text-muted-foreground text-sm">Online</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-red-500" />
                <p className="text-muted-foreground text-sm">Offline</p>
              </div>
            )}
            {!isUserOnline && (
              <p className="text-muted-foreground text-sm bg-accent p-3 rounded-md">
                Last time active{" "}
                {formatRelativeDate(new Date(user?.lastActive || Date.now()))}
              </p>
            )}
          </div>
        ) : (
          <div className="w-24 h-4 mt-1 rounded-md animate-pulse bg-accent" />
        )}
      </div>
      <UserInfoTile
        Icon={AtSign}
        title={user?.username || ""}
        subTitle="Username"
        toolTipText="Copy username to clipboard"
        loading={isLoading}
      />
    </div>
  );
};

export default InfoBar;
