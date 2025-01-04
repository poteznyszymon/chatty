import Drawer from "@/components/shared/Drawer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <main className="min-h-screen flex">
      <Drawer className="bg-card hidden max-h-screen lg:flex flex-col sm:w-[26rem] border-r sticky top-0" />
      <Outlet />
    </main>
  );
};

export default RootLayout;
