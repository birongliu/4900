"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { redirect, useParams } from "next/navigation";
import { AddMessagePopup } from "@/app/ui/chat/AddTalk";
import { useUser } from "@clerk/nextjs";
export default function Chat() {
  const { user } = useUser();
  const [location, setLocation] = useState("");
  if(!user) redirect("/");
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
        return { error: "An error occured" };
      };
      const data = await fetchRoom.json();
      if(!data.length) {
        setLocation("/chat/new");
        return;
      }
      setLocation(`/chat/${data[0].roomId}`);
    }
    resolve()
  }, [user]);
  if(location) return redirect(location);
}