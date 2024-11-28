'use server'
import { clerkClient } from "@clerk/nextjs/server";

export default async function getUser(userId: string) {
    const users = await clerkClient().users.getUser(userId)
    return users
}