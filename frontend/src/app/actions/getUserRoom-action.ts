'use server';

export async function getUserRoom(id: string) {
  const fetchRoom = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${id}`,
    {
      method: "GET",
      next: { tags: ["rooms"] },
      cache: "force-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return fetchRoom;
}

