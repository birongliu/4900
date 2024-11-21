import { ClerkLoaded } from '@clerk/nextjs';
import React from 'react'

export default function ChatLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <section className="h-screen bg-white">
        <ClerkLoaded>
          {children}
        </ClerkLoaded>
      </section>
    );
  }
  