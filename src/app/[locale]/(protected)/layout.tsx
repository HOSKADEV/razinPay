import { auth } from "@/auth";
import { redirect } from "next/navigation";
interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const session = await auth();
  if (!session) {
    return redirect("/auth/login");
  }
  return (
    <main className="min-h-screen w-full bg-muted-foreground">{children}</main>
  );
};

export default ProtectedLayout;
