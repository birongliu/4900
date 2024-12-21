import { Schema, model } from "mongoose";

const userModel = new Schema({
    userId: String,
    userName: String,
    imageUrl: String,
    petPreference: Object,
    favorites: { type: [String], default: [] },
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

export async function addPetToFavorites(userId, petId) {
    const user = await users.findOne({ userId });
    if (!user) throw new Error("User not found");

    if (user.favorites.includes(petId)) {
        throw new Error("Pet is already in favorites");
    }

    user.favorites.push(petId);
    await user.save();
    return user.favorites; // Return updated favorites
}

export async function removePetFromFavorites(userId, petId) {
    const user = await users.findOne({ userId: { $eq: userId } });
    if (!user) throw new Error("User not found");

    user.favorites = user.favorites.filter((id) => id !== petId);
    await user.save();
    return user.favorites; // Return updated favorites
}


// export async function addPetToUser(userID, petID) {
//     const user = await getUserByID(userID);
//     if (!user)
//         throw new Error("User not found");

//     user.pets.push(petID);
//     await user.save();
// }