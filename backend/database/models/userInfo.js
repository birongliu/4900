import { Schema, model } from "mongoose";

const userModel = new Schema({
    userID: String,
    petPreference: String,
    pets: [{ type: String, ref: "pets" }]
});

const users = model("users", userModel);

export async function create(data) {
    const result = await users.create(data)
    return result;
}
export async function findAll() {
    return await users.find()
} 
export async function getUserByID(userID) {
    const data = await users.findOne({
        userID,
    })
    if (!data) return null
    return data;
}

// export async function addPetToUser(userID, petID) {
//     const user = await getUserByID(userID);
//     if (!user)
//         throw new Error("User not found");

//     user.pets.push(petID);
//     await user.save();
// }