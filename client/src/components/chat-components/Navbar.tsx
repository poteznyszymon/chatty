import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import UserAvatar from "../shared/UserAvatar";
import { UseLayoutContext } from "@/context/LayoutContext";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";

const Navbar = ({ username }: { username: string }) => {
  const { setIsUserInfoOpen } = UseLayoutContext();
  const { data: user } = useQuery<User | null>({
    queryKey: ["user", `${username}`],
  });

  return (
    <nav
      onClick={() => setIsUserInfoOpen(true)}
      className="bg-card w-full h-[4rem] flex items-center px-2 md:px-5 gap-2 cursor-pointer"
    >
      <Link
        to="/"
        className="block lg:hidden hover:bg-secondary p-2 rounded-full"
      >
        <ArrowLeft className="text-muted-foreground" />
      </Link>

      <div className="flex items-center gap-2 ">
        <UserAvatar url={user?.imageUrl || ""} className="size-10" />
        <p>{username}</p>
      </div>
    </nav>
  );
};

export default Navbar;
