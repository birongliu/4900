import Sidebar from "@/app/ui/navigation/Sidebar";
import { ClerkLoaded } from "@clerk/nextjs";
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen bg-white">
      <ClerkLoaded>
        <Sidebar />
        {children}
      </ClerkLoaded>
    </section>
  );
}
