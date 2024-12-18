import Drawer from "@/components/shared/Drawer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className="min-h-screen flex bg-backgroundImage bg-primary/20 ">
      <Drawer className="bg-card hidden sm:flex flex-col sm:w-[26rem] border-r" />
      <Outlet />
    </main>
  );
};

export default RootLayout;
