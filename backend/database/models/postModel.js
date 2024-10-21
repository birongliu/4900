import { Schema, model } from "mongoose";

const postModel = new Schema({
    postID: String,
    userID: { type: String, ref: "users", default: null },
    postTitle: String,
    image_id: String,
    content: String
}, {timestamps: true});

const post = model("post", postModel);


export async function create(data) {
    const result = await post.create(data)
    return result;
}

export async function findAll() {
    return await post.find()
} 

export async function getPostbyTitle(postTitle) {
    const data = await post.findOne({
        postTitle: { $eq: postTitle }
    })
    if (!data) return null
    return data;
}
                                                                                                                                               
export async function update(id, data) {
    return await post.updateOne({ postID: id }, data);
}