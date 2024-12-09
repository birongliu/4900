"use client";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const navigation = [
  {
    icon: "/dashboard/home.svg",
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: "/dashboard/heart.svg",
    name: "Favorites",
    href: "/dashboard/favorites",
  },
  {
    name: "posts",
    icon: "/dashboard/post.svg",
    href: "/posts",
  },  
  {
    icon: "/dashboard/chat.svg",
    name: "Chat",
    href: "/chat",
  },
  {
    icon: "/dashboard/settings.svg",
    name: "Settings",
    href: "/dashboard/settings",
  },
  {
    icon: "/dashboard/logout.svg",
    name: "Logout",
    href: "/",
  },
];
export default function Sidebar() {
  const path = usePathname();
  const user = useUser()
  const { signOut } = useClerk()

  if(!user.isSignedIn){
    return null
  }

  return (
    <div className="text-white border-2 z-10 shadow-md flex justify-center md:m-0 rounded-xl md:rounded-none md:fixed md:top-0 md:left-0 md:h-full md:block fixed bottom-10 left-[50%] md:-translate-x-0 -translate-x-[50%] bg-light-mint md:w-20 lg:w-64">
      <div className="md:flex items-center lg:justify-start justify-center hidden py-1">
        <Image
          className="h-20 w-20 border-black"
          src="/logo/black-logo.svg"
          alt="logo"
          width={32}
          height={32}
        />
        <span className="text-black hidden lg:block text-lg font-poppins font-semibold">
          PetPals
        </span>
      </div>
      <div className="flex p-2 gap-2 md:flex-col h-full">
        {navigation.map((nav) => (
          <Link
            href={nav.href}
            key={nav.name}
            onClick={async () => nav.name === "Logout" ? await signOut() : () => void 0}
            className={`flex lg:justify-start rounded-xl items-center p-2 gap-2 justify-center hover:bg-light-rose ${
              path === nav.href ? "bg-light-rose" : ""
            }`}
          >
            <Image
              className="md:h-8 md:w-10"
              src={nav.icon}
              alt={nav.name}
              width={25}
              height={25}
            />
            <span className="text-gray-500 hidden lg:block text-lg font-poppins">
              {nav.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}