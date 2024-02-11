import { auth } from "@/auth";
import { RegisterForm } from "@/components/auth/register-form";
import { notFound } from "next/navigation";

const RegisterPage = async () => {
  const session = await auth();
  if (session) {
    notFound();
  }
  return <RegisterForm />;
};

export default RegisterPage;
