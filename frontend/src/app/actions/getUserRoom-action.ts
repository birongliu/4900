'use server';

import { Room } from "../context/getUserContext";

export async function getUserRoom(id: string): Promise<Room[]> {
  const fetchRoom = await fetch(
    `${process.env.API_URL}/api/rooms/${id}`,
    {
      method: "GET",
      next: { tags: ["rooms"] },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return fetchRoom.json();
}

