import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <main className="min-h-screen flex bg-backgroundImage bg-primary/20 justify-center items-center">
      <div className="border sm:w-auto w-full sm:h-auto h-screen bg-card rounded-md flex items-center justify-center p-10 sm:p-8 min-w-[27rem]">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
