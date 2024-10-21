import { Schema, model } from "mongoose";

const petModel = new Schema({
    petID: String,
    breedType: String,
    name: String,
    animalType: String,
    feature: String,
    // userID: { type: Schema.Types.ObjectId, ref: "users", default: null }, // User who adopts the pet
    // isAdopted: { type: Boolean, default: false }
});

const pets = model("pets", petModel);


export async function create(data) {
    const result = await pets.create(data)
    return result;
}

export async function findAll() {
    return await pets.find()
} 

export async function get(petID) {
    const data = await pets.findOne({
        petID: { $eq: petID }
    })
    if (!data) return null
    return data;
}

export async function update(id, data) {
    return await pets.updateOne({ petID: id }, data);
}