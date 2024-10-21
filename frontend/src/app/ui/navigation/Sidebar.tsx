"use client";
import {
  SignedIn,
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const navigation = [
  {
    name: "Dashboard",
    icon: "/dashboard/home.svg",
    href: "/dashboard",
  },
  {
    name: "Chat",
    icon: "/dashboard/chat.svg",
    href: "/dashboard/chat",
  },
  {
    name: "Settings",
    icon: "/dashboard/settings.svg",
    href: "/dashboard/settings",
  },
  {
    name: "Sign Out",
    icon: "/dashboard/logout.svg",
    href: "/",
  },
];

export default function Sidebar() {
  const {user} = useUser();
  const [selected, setSelected] = React.useState('');
  if(!user) return <div>Unauthorized</div>;
  return (
    <div className="flex sticky  lg:w-1/4 py-12 w-full border overflow-auto bg-pureWhite">
      <div className="flex w-full h-10 lg:flex-col justify-between px-5">
        <div className="flex flex-row items-center w-full lg:h-12">
          <Image
            src="/logo/black-logo.svg"
            alt="pet selector logo"
            width={100}
            height={100}
          />
          <span className="text-black font-bold text-xl">PetPals</span>
        </div>
        <div className="lg:flex hidden flex-col items-center py-7 gap-2">
          <Image
            src={user.imageUrl}
            alt={user.id}
            width={100}
            height={100}
            className="rounded-full w-12 h-12 lg:w-20 lg:h-20"
          />
          <span className="hidden lg:block text-black text-center font-poppins text-base font-bold pt-3">
            {user.fullName}
          </span>
          <span className="hidden lg:block text-gray-500 text-center font-poppins text-sm">
            {user.emailAddresses[0].emailAddress}
          </span>
        </div>
        <div className="lg:flex justify-center ml-auto mr-auto flex-col hidden">
          {navigation.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelected(item.name)}
              className={`flex rounded hover:bg-slate-100   ${selected === item.name && "bg-slate-200"} ${
                index === navigation.length - 1 && "mt-5"
              } items-center gap-2 py-1 px-4`}
            >
              {item.name === "Sign Out" ? (
                <div className="text-gray-500 flex w-full gap-2 p-2 rounded">
                   <Image
                    src={item.icon}
                    alt={item.name}
                    width={25}
                    height={25}
                  />
                  <SignedIn>
                    <SignOutButton redirectUrl={process.env.NEXT_PUBLIC_CLIENT_URL} />
                  </SignedIn>
                </div>
              ) : (
                <Link
                  className="flex gap-1 items-center cursor-pointer p-2 rounded w-full"
                  href={item.href}
                >
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={25}
                    height={25}
                  />
                  <span className="text-gray-500 font-poppins text-base">
                    {item.name}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* <span className="border-l-1 border hidden h-full px w-full lg:block rounded border-gray-200" /> */}
    </div>
  );
}
