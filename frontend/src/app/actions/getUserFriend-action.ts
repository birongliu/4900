'use server';
export default async function getUserFriend(username: string) {
  const fetchFriend = await fetch(
    `${process.env.API_URL}/api/users/${username}/friends`,
    {
      method: "GET",
      cache: "force-cache",
      next: { tags: ["friends"] },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return fetchFriend;
}
