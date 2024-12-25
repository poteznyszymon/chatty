import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import { useQueryClient } from "@tanstack/react-query";
import BottomBar from "../drawer-components/BottomBar";
import SearchBar from "../drawer-components/SearchBar";
import ContactsList from "../drawer-components/ContactsList";
import ProfileDrawer from "../drawer-components/ProfileDrawer";

interface DrawerProps {
  className?: string;
}

const Drawer = ({ className }: DrawerProps) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["auth-user"]);

  return (
    <>
      <div className={cn(className, "px-3")}>
        <div className="flex-1 flex flex-col">
          <SearchBar />
          <div className="flex-1">
            <ContactsList />
          </div>
        </div>
        <BottomBar username={user?.username || ""} />
      </div>
      <ProfileDrawer className={className} />
    </>
  );
};

export default Drawer;
