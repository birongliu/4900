"use client";
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { getUserRoom } from "@/app/actions/getUserRoom-action";
export default function Chat() {
  const { user } = useUser();
  const [location, setLocation] = useState("");
  const router = useRouter();
  if(!user) redirect("/");
  useEffect(() => {
    const resolve = async () => {
      const room = await getUserRoom(user.id);
      if(!room.length) {
        setLocation("/chat/new");
        return;
      }
      setLocation(`/chat/${room[0].roomId}`);
    }
    resolve()
  }, [user]);
  if(location.length > 0) return router.replace(location);
}