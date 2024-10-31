import { Schema, model } from "mongoose";

const postModel = new Schema(
  {
    postID: String,
    userID: { type: String, ref: "users" },
    postTitle: String,
    image_id: String,
    content: String,
    likes: {
      type: [String], // array of user ids
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const post = model("post", postModel);

export async function create(data) {
  const result = await post.create(data);
  return result;
}

export async function findAll() {
  return await post.find();
}

export async function findById(id) {
  const data = await post.findOne({
    postID: { $eq: id },
  });
  if (!data) return null;
  return data;
}

export async function getPostbyTitle(postTitle) {
  const data = await post.findOne({
    postTitle: { $eq: postTitle },
  });
  if (!data) return null;
  return data;
}

export async function update(id, data) {
  return await post.updateOne({ postID: id }, data);
}

export async function findByIdAndDelete(id) {
  return await post.deleteOne({ postID: id });
}
