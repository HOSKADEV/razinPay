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
    <main className="bg-muted-foreground h-full w-full">
        {children}
    </main>
  );
};

export default ProtectedLayout;
