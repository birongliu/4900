"use client";
import { Room, User } from "@/app/context/getUserContext";
import Image from "next/image";
import React from "react";
import { Searchbar } from "../navigation/search/search";
import { v4 as uuidv4 } from 'uuid';
import { redirect, useRouter } from "next/navigation";

export default function FriendList({ friends, active, me, rooms }: { rooms: Room[], me: User, active: boolean, friends: User[] }) {
  const router = useRouter();
  const handleClick = (user: User) => {
    const isValid = rooms.find((room) => room.recipients.some((r) => r.username === user.username));
    if(isValid) return router.push(`/chat/${isValid.roomId}`);
    const createRoom = async () => {
      const fetchRoom = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`, {
        method: "POST",
        cache: "force-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipients: [user.id, me.id],
          roomId: uuidv4(),
          messages: [],
        }),
      });
      if(!fetchRoom.ok) {
        return;
      }
      const data = await fetchRoom.json();
      return router.push(`/chat/${data.roomId}`);
    }
    createRoom();
  }
  function handleChat(e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) {
    e.preventDefault();
    
  }
  return (
    <div className={`w-full lg:flex hidden p-3  flex-col space-y-5 lg:w-[75%] lg:${active ? "block" : "hidden"}`}>
      <Searchbar className="" title="Search for your friends" data={friends} render={(item) => <div onClick={() => redirect(`/chat/${item.id}`)}>{item.username}</div>} filter={(search, item) => item.username === search}  />
      <div className="flex flex-col gap-3 w-full">
        <table className="w-full border-collapse  bg-white shadow-sm rounded-xl">
          <thead className="bg-slate-300 w-full top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Friend Name
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200  h-[75%] border-black">
            {friends.length > 0 ? (
              friends.map((friend, index) => (
                <tr onClick={(a) => {
                  a.preventDefault();
                  handleClick(friend);
                }} key={index} className="hover:bg-gray-50 cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center gap-2">
                    <Image
                      src={friend.imageUrl}
                      alt={`${friend.username} image`}
                      width={200}
                      height={200}
                      className="w-10 h-10 bg-black rounded-full"
                    />
                    <div className="flex flex-col">
                      {friend.username}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  No friends added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
