import { UserContextProvider } from "@/app/context/getUserContext";
import { SocketProvider } from "@/app/context/SocketContext";
import { ClerkLoaded } from "@clerk/nextjs";
import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen bg-white">
      <ClerkLoaded>
        <SocketProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </SocketProvider>
      </ClerkLoaded>
    </section>
  );
}
