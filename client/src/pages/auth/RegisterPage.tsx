import RegisterForm from "@/forms/RegisterForm";
import { Link } from "react-router";

const RegisterPage = () => {
  return (
    <div className="flex flex-col w-full space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-center">Welcome there</h1>
        <p className="text-center text-muted-foreground">
          Enter your credentials to register
        </p>
      </div>
      <RegisterForm />
      <p className="text-sm text-muted-foreground text-center">
        Already have an account?{" "}
        <Link
          className="text-primary font-semibold hover:underline"
          to="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
