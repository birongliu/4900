import { getUser } from "@/app/actions/getUser-action";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
const navigation = [
  {
    icon: "/dashboard/home.svg",
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: "/dashboard/chat.svg",
    name: "Chat",
    href: "/dashboard/chat",
  },
  {
    icon: "/dashboard/system.svg",
    name: "settings",
    href: "/dashboard/settings",
  },
];
export default async function Sidebar() {
  const data = await getUser();
  if (!data) return null;
  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 transition-transform -translate-x-full lg:translate-x-0">
      <div className="flex text-lg font-bold items-center">
        <Image
          width={65}
          height={65}
          className="w-24 h-24"
          alt="logo"
          src="/logo/black-logo.svg"
        />
        <span className="text-black text-2xl dark:text-white">PetPals</span>
      </div>
      <div className="flex justify-center items-center flex-col">
        <button>
        <Image
          src={data.imageUrl}
          alt={data.id}
          width={25}
          height={25}
          className="w-20 h-20 rounded-full mb-2"
        />
        </button>
        <span className="font-bold font-poppins text-gray-600">
          {data.username}
        </span>
        <span className="text-sm text-gray-600 font-poppins">
          {data.emailAddresses[0].emailAddress}
        </span>
      </div>
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {navigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
          <svg
            className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 21"
          >
            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
          </svg>
          <SignOutButton />
        </div>
      </div>
    </aside>
  );
}
