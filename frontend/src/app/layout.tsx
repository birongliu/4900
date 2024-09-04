import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./ui/navigation/Header";
import { ThemeContext } from "./ui/navigation/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat Finder Assister",
  description: "Assisting new cat users on adopting/purchase cats and their accessories by providing them with necessary information/fun facts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeContext>
        <Header />
        {children}
        </ThemeContext>
      </body>
      </html>
      </ClerkProvider>

  );
}
