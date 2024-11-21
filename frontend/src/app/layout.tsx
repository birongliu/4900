import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeContext } from "./ui/navigation/ThemeProvider";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import {
  QueryClient,
  QueryClientContext,
  QueryClientProvider,
} from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetPals",
  description:
    "Discover the joy of pet adoption alongside a supportive community of animal lovers. PetPals is a space where you can not only find your perfect pet match but also share experiences, advice, and love with other pet owners. Let's make adoption the start of a new journey together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client = new QueryClient();
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ClerkLoaded>
            {children}
            <Analytics />
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
