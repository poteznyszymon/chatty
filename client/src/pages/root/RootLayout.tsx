import Drawer from "@/components/shared/Drawer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className="min-h-screen flex bg-backgroundImage bg-primary/30 ">
      <Drawer />
      <Outlet />
    </main>
  );
};

export default RootLayout;
