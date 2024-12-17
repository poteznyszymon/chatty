import LoginForm from "@/forms/LoginForm";
import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-center">Welcome back</h1>
        <p className="text-center text-muted-foreground">
          Enter your credentials to login
        </p>
      </div>
      <LoginForm />
      <p className="text-sm text-muted-foreground text-center">
        Don't have an account?{" "}
        <Link
          className="text-primary font-semibold hover:underline"
          to="/register"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
