import { auth } from "@/auth";
import { LoginForm } from "@/components/auth/login-form";
import { notFound } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();
  if (session) {
    notFound();
  }
  return <LoginForm />;
};

export default LoginPage;
