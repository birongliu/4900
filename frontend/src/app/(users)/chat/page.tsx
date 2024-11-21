'use client'
import React, { useEffect } from "react";
import Image from "next/image";
import { redirect, RedirectType, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { AddMessagePopup } from "@/app/ui/chat/AddTalk";


export default function Chat() {
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      redirect("/", RedirectType.replace);
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chats/${user.id}`)
  }, [user]);

  return redirect("/chat/1", RedirectType.replace);
}

export function SideBar({ username, friends, handleClick, active }: { username: string, active: string, handleClick: (id: string) => void, friends: { id: string, username: string, photo: string }[] }) {
  const { id } = useParams()
  const router = useRouter();
  return (
    <div className={` w-full lg:w-1/4 ${active.length === 0 ? "block" : "hidden"} lg:block  rounded-xl`}>
      <div className="p-2 rounded-t-xl">
        <div className="flex justify-between items-center">
        <h1 className="font-poppins text-3xl p-2 font-semibold">Chats</h1>
        <AddMessagePopup username={username} />
        </div>
        <input
          className="w-full h-10 block rounded-xl border-2 p-5 text-sm"
          placeholder="Find a conversation"
          type="text"
        />
      </div>
      <div className=" p-2 rounded-b-xl">
        <ul className="flex  flex-col gap-2">
          {friends.length ? friends.map((friend) => (
          <button key={friend.id} onClick={() => {
            handleClick(active === friend.id ? '' : friend.id)
        
          }}>
            <button onClick={(e) => {
              e.preventDefault()
              router.push(`/chat/${friend.id}`)
            }} className="flex w-full items-center gap-2">
            <li key={friend.id} className={`flex w-full items-center gap-2 p-2 bg-light-gray ${active && friend.id === id && "bg-light-ivory"} ${active === friend.id ? "bg-light-ivory" : ""} rounded-xl hover:bg-light-ivory cursor-pointer`}>
              <Image alt={`${friend.username} photo`} src={friend.photo} height={200} width={200} className="w-12 h-12 bg-black border-2 rounded-full" />
              <h1 className="font-poppins text-xl text-bold">
                {friend.username}
              </h1>
            </li>
            </button>
            </button>
          )) : <div className="items-center justify-center flex font-semibold text-base h-full">No conversation found</div>}
        </ul>
      </div>
    </div>
  );
}



