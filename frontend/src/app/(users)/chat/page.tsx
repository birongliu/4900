"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { redirect, useParams, useRouter } from "next/navigation";
import { AddMessagePopup } from "@/app/ui/chat/AddTalk";
import { useUser } from "@clerk/nextjs";
import { UserContext } from "@/app/context/getUserContext";
export default function Chat() {
  const { user } = useUser();
  const router = useRouter();
  const context = useContext(UserContext);
  if(context.isLoaded && !context.rooms.length) redirect("/chat/newl");
  if(!user) redirect("/login");
  useEffect(() => {
    const resolve = async () => {
      const fetchRoom = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${user.id}`,
        {
          method: "GET",
          cache: "force-cache",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if(!fetchRoom.ok) {
        return;
      };
      const data = await fetchRoom.json();
      if(!data.length) return router.push("/chat/new");
      return router.push(`/chat/${data[0].roomId}`)
    }
    resolve()
  }, [router, user, context.rooms]);

}

export function SideBar({
  username,
  rooms,
  handleFriend,
  toggleFriendButton,
  addFriend,
  handleClick,
  active,
}: {
  username: string;
  active: string;
  handleFriend: () => void;
  addFriend: (id: string) => void;
  toggleFriendButton: boolean;
  handleClick: (id: string) => void;
  rooms: { roomId: string, id: string; username: string; imageUrl: string }[];
}) {
  const { id } = useParams();
  return (
    <div
      className={`w-full sticky top-0 lg:w-1/4 ${toggleFriendButton ? "block" : "hidden"} ${
       active === "" ? "block" : "hidden"
      } lg:block  rounded-xl`}
    >
      <div className="p-2 rounded-t-xl">
        <div className="flex justify-between items-center">
          <h1 className="font-poppins text-3xl p-2 font-semibold">Chats</h1>
          <AddMessagePopup username={username} addFriend={addFriend} />
        </div>
        <input
          className="w-full h-10 block rounded-xl border-2 p-5 text-sm"
          placeholder="Find a conversation"
          type="text"
        />
      </div>
      <div className="p-2 rounded-b-xl">
        <ul className="flex  flex-col gap-2">
          {rooms.length ? (
            rooms.map((friend) => (
              <div
                key={friend.id}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(friend.roomId);
                    handleClick(friend.roomId);
                  }}
                  className="flex w-full items-center gap-2"
                >
                  <li
                    key={friend.id}
                    className={`flex w-full items-center gap-2 p-2 bg-light-gray ${
                      active && friend.id === id && "bg-light-ivory"
                    } ${
                      active === friend.id ? "bg-light-ivory" : ""
                    } rounded-xl hover:bg-light-ivory cursor-pointer`}
                  >
                    <Image
                      alt={`${friend.username} photo`}
                      src={friend.imageUrl}
                      height={200}
                      width={200}
                      className="w-12 h-12 bg-black border-2 rounded-full"
                    />
                    <h1 className="font-poppins text-xl text-bold">
                      {friend.username ?? ""}
                    </h1>
                  </li>
                </button>
              </div>
            ))
          ) : (
            <div className="items-center justify-center flex font-semibold text-base h-full">
              No conversation found
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
