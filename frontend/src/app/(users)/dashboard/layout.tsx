import Sidebar from "@/app/ui/navigation/Sidebar";
import { ClerkLoaded } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth();
  return (
    <section className="h-screen bg-white lg:flex">
      <ClerkLoaded>
        <Sidebar />
        {children}
      </ClerkLoaded>
    </section>
  );
}
