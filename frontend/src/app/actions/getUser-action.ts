import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getUser() {
    const user = auth();
    if (!user.userId) return null;
    try {
        const data = await clerkClient().users.getUser(user.userId);
        if (!data) return null;
        return data;
    } catch (error) {
        return null;
    }
}