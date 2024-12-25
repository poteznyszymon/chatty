import Drawer from "@/components/shared/Drawer";

const HomePage = () => {
  return (
    <div className="flex-1 min-h-screen flex">
      <Drawer className="w-full flex flex-col lg:hidden bg-card" />
      <div className="flex-1 sm:flex items-center justify-center hidden"></div>
    </div>
  );
};

export default HomePage;
