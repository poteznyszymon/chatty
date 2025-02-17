import useVerifyUser from "@/hooks/auth/useVerifyUser";
import { Loader2 } from "lucide-react";
import { Outlet, useNavigate } from "react-router";

const AuthenticatedRoutes = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useVerifyUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="text-foreground animate-spin size-7" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return <Outlet context={user} />;
};

export default AuthenticatedRoutes;
