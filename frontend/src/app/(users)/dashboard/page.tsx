"use client";
import { Searchbar } from "@/app/ui/navigation/search/search";
import { useUser } from "@clerk/nextjs";
import React from "react";
export default function Dashboard() {
  const { user } = useUser();
  if(!user) return <div>Unauthorized</div>;
  return (
    <div className="px-12 py-12 bg-pureWhite lg:w-2/4 lg:rounded-r-xl">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user.username}</p>
        </div>
      </div>
      <div className="border text-black rounded-xl h-52 grid grid-cols-2">
        <div className="">
          <h2 className="text-xl font-bold">Recommended</h2>
          <p>Find your perfect companion</p>
        </div>
        <div>
          <Searchbar />
        </div>
      </div>
    </div>

  );
}
