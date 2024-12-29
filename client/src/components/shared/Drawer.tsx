import { cn } from "@/lib/utils";
import BottomBar from "../drawer-components/BottomBar";
import SearchBar from "../drawer-components/SearchBar";
import ContactsList from "../drawer-components/ContactsList";
import ProfileDrawer from "../drawer-components/ProfileDrawer";
import EditProfileDrawer from "../drawer-components/EditProfileDrawer";

interface DrawerProps {
  className?: string;
}

const Drawer = ({ className }: DrawerProps) => {
  return (
    <>
      <div className={cn(className, "px-3")}>
        <div className="flex-1 flex flex-col">
          <SearchBar />
          <div className="flex-1">
            <ContactsList />
          </div>
        </div>
        <BottomBar />
      </div>
      <ProfileDrawer className={className} />
      <EditProfileDrawer className={className} />
    </>
  );
};

export default Drawer;
