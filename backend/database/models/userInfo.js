import { Schema, model } from "mongoose";

const userModel = new Schema({
    userId: String,
    userName: String,
    imageUrl: String,
    petPreference: Object,
    favoritePets: [String],
    friends: { type: [String], default: [] }
});

const users = model("users", userModel);

export async function create(data) {
    const result = await users.create(data)
    return result;
}
export async function findAll() {
    return await users.find()
} 
export async function getUserByName(userName) {
    const user = await users.findOne({
        userName,
    })
    if (!user) return null
    return user;
}
export async function getUserById(userId) {
    const user = await users.findOne({
        userId,
    })
    if (!user) return null
    return user;
}
export async function getFriends(userId) {
    const friends = await users.findOne({
        userId: userId,
    })
    return friends.friends;
}

export async function addFriend(user, friend) {
    user.friends.push(friend.userId)
    friend.friends.push(user.userId)
    await user.save()
    await friend.save()
    
}

// export async function addPetToUser(userID, petID) {
//     const user = await getUserByID(userID);
//     if (!user)
//         throw new Error("User not found");

//     user.pets.push(petID);
//     await user.save();
// }