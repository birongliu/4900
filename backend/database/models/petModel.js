import { response } from "express";
import { Schema, model } from "mongoose";

const petModel = new Schema({
    name: {
        type: String,
    },
    animalId: {
        type: String,

    },
    sex: String,
    birthDate: { type: Date, default: null },
    breed: String,
    size: String,
    housetrained: Boolean,
    health: {
        isCurrentVaccinations: Boolean,
        isSpecialNeeds: Boolean
    },
    goodWith: {
        dogs: { type: Boolean, default: false },
        cats: { type: Boolean, default: false },
        kids: { type: Boolean, default: false }
    },
    isAdoptionPending: Boolean,
    locationID: String,
    descriptionText: String,
    pictureThumbnailUrl: String,
    updatedDate: Date
    // userID: { type: Schema.Types.ObjectId, ref: "users", default: null }, // User who adopts the pet
    // isAdopted: { type: Boolean, default: false }
});

const pets = model("pets", petModel);
export { pets }

export async function create(data) {
    const result = await pets.create(data)
    return result;
}

export async function findAll() {
    return await pets.find()
} 

export async function get(petID) {
    const data = await pets.findOne({
        animalId: { $eq: petID }
    })
    if (!data) return null
    return data;
}

export async function update(id, data) {
    return await pets.updateOne({ petID: id }, data);
}