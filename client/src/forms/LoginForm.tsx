import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { loginSchema, loginValues } from "../../../src/validation/schemas";
import { InputWithPassword } from "@/components/shared/InputWithPassword";
import LoadingButton from "@/components/shared/LoadingButton";
import useLogin from "@/hooks/auth/useLogin";

const LoginForm = () => {
  const { loginUser, isLoading } = useLogin();

  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: loginValues) => {
    loginUser(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputWithPassword {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={isLoading} className="w-full" type="submit">
          Sign In
        </LoadingButton>
      </form>
    </Form>
  );
};

export default LoginForm;
