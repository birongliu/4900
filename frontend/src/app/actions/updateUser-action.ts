"use server"
import { clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";
type UpdateUserParams = {
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    skipPasswordChecks?: boolean;
    signOutOfOtherSessions?: boolean;
    primaryEmailAddressID?: string;
    primaryPhoneNumberID?: string;
    primaryWeb3WalletID?: string;
    profileImageID?: string;
    totpSecret?: string;
    backupCodes?: string[];
    externalId?: string;
    createdAt?: Date;
    deleteSelfEnabled?: boolean;
    createOrganizationEnabled?: boolean;
    createOrganizationsLimit?: number;
}

export async function updateUser(userId: string, data: UpdateUserParams) {
    await clerkClient().users.updateUser(userId, data);
    revalidatePath("/dashboard", "layout")
}