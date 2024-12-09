'use client'
import { FormEvent, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { redirect, useParams, useRouter } from "next/navigation";
import { addComment, deletePostAction, getPostByIdAction, updateVote } from "@/app/actions/post-action";
import { useUser } from "@clerk/nextjs";

interface PostData {
  id: string;
  title: string;
  content: string;
  createdBy: string; 
  image_url: string;
  comments: { comment: string, userId: string }[];
  upvote: number;
  createdAt: string;
}

export default function Post() {
  const { id } = useParams();
  const { user } = useUser();
  const [data, setData] = useState<PostData>({
    id: "",
    title: "",
    createdBy: "",
    comments: [],
    content: "",
    image_url: "",
    upvote: 0,
    createdAt: "",
  });
  const [comments, setComments] = useState<{ comment: string, userId: string }[]>([]);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const navigate = useRouter()
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    async function fetchPost() {
      try {
        const resolve = await getPostByIdAction(`${id}`) as PostData;
        if(!resolve) {
          return router.replace("/posts");
        }
        setData(resolve);
        setVotes(resolve.upvote);
        console.log(resolve)
        setComments(resolve.comments);
        console.log(resolve)
      } catch (error) {
        redirect("/posts");
        console.log(error)
      }
    }
    fetchPost();
  }, [id]);
  if(!user) {
    return <div>loading...</div>
  }
  const date = new Date(data.createdAt);
  console.log(comments)
  const handleUpvote = async () => {
    setVotes((prevVotes) => prevVotes + 1);
    await updateVote({ id: id as string, vote: votes + 1 });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComments((prevComments) => [...prevComments, { comment: comment, userId: user.id }]);
    await addComment(user.id, { id: id as string, comment: comment });
    setComment("");
  };

  return (
    <div className="max-w-3xl mx-auto mt-5 bg-white rounded-lg shadow-md overflow-hidden">
      <a
        href="/posts"
        className="inline-block px-4 py-2 m-2 bg-green-500 text-white rounded-md"
      >
        Back
      </a>
      <div className="p-4">
        <div className="text-gray-500 text-sm">
          Posted on{" "}
          {`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
        </div>
        <h2 className="my-2 text-xl font-bold">{data.title}</h2>
        <p className="text-gray-700">{data.content || "No content"}</p>
        {data.image_url && (
          <Image
            src={data.image_url}
            alt="Portrait of Founding Fathers"
            className="w-full h-auto mt-4 rounded-md"
          />
        )}
        <div className="flex mt-4">
          <button
            onClick={handleUpvote}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            👍 {votes} upvotes
          </button>
        </div>
        <div className="border-t mt-4 pt-4">
          {comments.map((c, index) => (
            <div key={index} className="text-gray-600 mb-2">
              {c.userId}: {c.comment}
            </div>
          ))}
        </div>
        <form onSubmit={async (e) => handleSubmit(e)} className="mt-4">
          <input
            type="text"
            placeholder="Leave a comment..."
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </form>
        <button
          onClick={async () => {
            if(user.id === data.createdBy) {
              console.log("delete")
              await deletePostAction(id as string);
              alert("Post deleted successfully");
              navigate.push("/posts");
            }
            if(user.id !== data.createdBy) {
              alert("You are not authorized to delete this post");
            }
          }}
          className="mt-4 text-green-500 hover:text-green-700 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
