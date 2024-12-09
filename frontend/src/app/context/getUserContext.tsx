"use client";
import React, { createContext, useEffect, useState } from "react";
import { useUser, } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Message } from "../(users)/chat/[id]/page";


export interface User {
  id: string;
  username: string;
  imageUrl: string;
}

export interface Room {
  roomId: string;
  recipients:User[];
  createdAt: string;
  messages: Message[];
}

export type ContextUser = User & {
  friends: User[],
  isLoaded: boolean;
  rooms: Room[];
};

export const UserContext = createContext<ContextUser>({ isLoaded: false, id: "", username: "", imageUrl: "", friends: [], rooms: [] });

interface UserContextProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({
  children,
}) => {
  const [userState, setUserState] = useState<ContextUser>({ isLoaded: false, id: "", username: "", imageUrl: "", friends: [], rooms: [] });
  const { user, isLoaded, isSignedIn } = useUser();
  if(!isSignedIn) redirect("/")

  useEffect(() => {
    const processUser = async () => {
      if (isLoaded && isSignedIn && user) {
       const fetchRoom = fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${user.id}`,
          {
            method: "GET",
            next: { revalidate: 1 },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const fetchFriend = fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.username}/friends`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const [room, friend] = await Promise.all([fetchRoom, fetchFriend]);
        if(room.status !== 200 || friend.status !== 200) return setUserState({ isLoaded: true, id: user.id, username: user.username ?? "", imageUrl: user.imageUrl, friends: [], rooms: [] });
        const [rooms, friends] = await Promise.all([room.ok && room.status === 200 ? await room.json() : [], friend.ok && room.status === 200 ? await friend.json() : []]);
        setUserState({ isLoaded: true, friends: friends ?? [], rooms: rooms ?? [], id: user.id, username: user.username ?? "", imageUrl: user.imageUrl });
      }
    };
    processUser();
  }, [isLoaded, isSignedIn, user]);

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};
