import { Schema, model } from "mongoose";

const postModel = new Schema(
  {
    id: String,
    createdBy: { type: String, ref: "users" },
    title: String,
    content: String,
    upvote: Number,
    comments: {
      type: [{
        userID: { type: String, ref: "users" },
        content: String,
      }],
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
    id: { $eq: id },
  });
  if (!data) return null;
  return data;
}

export async function getPostbyTitle(postTitle) {
  const data = await post.findOne({
    title: { $eq: postTitle },
  });
  if (!data) return null;
  return data;
}

export async function update(id, data) {
  return await post.updateOne({ id: id }, data);
}

export async function findByIdAndDelete(id) {
  return await post.deleteOne({ id: id });
}
