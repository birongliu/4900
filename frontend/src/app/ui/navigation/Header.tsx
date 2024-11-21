"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import CloseIcon from "./icons/Close";
import MenuIcon from "./icons/Menu";
import Button from "../shared/Button";
import { SignedOut, UserButton, SignInButton, SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import { cn } from "@/app/utils/functions";
import { usePathname } from "next/navigation";

export default function Header({ navigationItems, className }: { className?: string, navigationItems?: string[] }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname()
  const { resolvedTheme } = useTheme();

  const isLandingPage = pathname === "/";

  return (
    <div
      className={cn(`flex relative ${isLandingPage ? `lg:justify-evenly relative justify-between items-center px-5 lg:mb-auto pt-2  ${
        isOpen ? "mb-48" : ""
      }` : "flex justify-between px-10"}`, className)}
    >
      
      {resolvedTheme === "dark" ? (
        <Image
          src="/logo/white-logo.svg"
          alt="pet selector logo"
          className={"w-24 h-20"}
          width={50}
          height={50}
        />
      ) : (
        <Image
          src="/logo/black-logo.svg"
          alt="pet selector logo"
          className={"w-24 h-20"}
          width={50}
          height={50}
        />
      )}
      <ul
        className={` items-center ${isLandingPage ? "block" : "hidden"} left-0 w-full border-black absolute gap-2 lg:mt-0 mt-5  lg:relative lg:justify-center lg:top-auto top-20 flex-col flex lg:w-auto ${
          isOpen ? "block" : "hidden"
        } lg:flex lg:flex-row `}
      >
        {isLandingPage && navigationItems && navigationItems.map((item, index) => (
          <Link className="w-full px-10 py-4 lg:hover:bg-inherit hover:bg-light-peach inset-0  z-10 cursor-pointer hover:bg-text-secondary lg:hover:bg-in" key={index} href={`#${item}`}>
              {item}
          </Link>
        ))}
      </ul>
     
      <div className="flex justify-center items-center gap-1 px-5 lg:px-0">
        <SignedOut>
          <Button className="text-white bg-dark-maroon rounded-lg font-poppins font-semibold dark:bg-white dark:text-darkMaroon">
            <SignInButton />
          </Button>
        </SignedOut>
        <SignedIn>
          <div role="user-button" className={`flex items-center overflow ${isLandingPage ? "border rounded-xl p-2  text-ms font-poppins dark:text-black dark:bg-white " : ""}`}>
            {isLandingPage ? <Link href="/dashboard">Dashboard</Link> : <UserButton />}
          </div>
        </SignedIn>
        <button className={`lg:hidden block ${isLandingPage ? "block" : "hidden"}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </div>
  );
}
