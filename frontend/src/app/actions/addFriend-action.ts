"use server";

export default async function addFriendAction(userId: string, friendId: string) {
    const resolve = await fetch(
        `${process.env.API_URL}/api/users/addFriend`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, friendId }),
        }
      );
    return resolve.status;
}