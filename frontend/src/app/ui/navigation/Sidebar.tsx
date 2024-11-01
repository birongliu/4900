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
    icon: "/dashboard/chat.svg",
    name: "Chat",
    href: "/dashboard/chat",
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
    <div className="text-white md:m-0 items-center  justify-center md:rounded-none sm:rounded-xl right-0 md:fixed md:top-0 md:left-0 md:h-full md:block fixed bottom-0 ml-auto mr-auto w-full flex flex-row bg-light-mint md:w-20 lg:w-64 left-0">
      <div className="flex items-center lg:justify-start justify-center">
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
      <div className="flex md:flex-col h-full">
        {navigation.map((nav) => (
          <Link
            href={nav.href}
            key={nav.name}
            onClick={async () => nav.name === "Logout" ? await signOut() : () => void 0}
            className={`flex p-2 rounded-xl md:items-center md:pl-2 md:rounded-xl ${
              path === nav.href ? "bg-light-rose" : ""
            } lg:mx-4 hover:bg-light-rose hover:rounded-xl  lg:justify-start justify-center  gap-2 my-2 mx-2  py-2`}
          >
            <Image
              className="h-8 w-10"
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
      <div className="md:bottom-10 sticky rounded-xl border-2 p-2 m-2 bg-light-rose ">
        <button className="flex items-center gap-2">
          <Image
            className="h-10 w-10 rounded-full"
            src={user.user.imageUrl}
            alt="logout"
            width={25}
            height={25}
          />
          <span className="text-gray-500 hidden lg:block text-lg font-poppins">
            {user.user.fullName}
          </span>
        </button>
      </div>
    </div>
  );
}
