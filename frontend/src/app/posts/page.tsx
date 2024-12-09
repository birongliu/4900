"use client";
import { useEffect, useState } from "react";
import getAllPostAction from "../actions/post-action";
import { redirect, useRouter } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  content: string;
  image_url: string;
  upvote: number;
  createdAt: string;
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useRouter();
  useEffect(() => {
    const getPosts = async () => {
      const response = await getAllPostAction()
      setPosts(response)   
    };
    getPosts();
  }, []);

  async function handleForm(event: React.FormEvent) {
    event.preventDefault();
    console.log("searching for", search);
    if (!search) {
      setPosts([]);
      return;
    }
    const response = posts.find((post) => post.title.includes(search));
    setPosts(response ? [response] : []);
  }

  function handleOrderByTime() {
    setPosts((prevPosts) =>
      [...prevPosts].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    );
  }

  function handleOrderByUpvotes() {
    setPosts((prevPosts) => [...prevPosts].sort((a, b) => b.upvote - a.upvote));
  }

  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Search Bar */}
      <div className="flex justify-center items-center w-ful md:flex-row flex-col">
        <form
          className="flex items-center justify-center w-full max-w-2xl"
          onSubmit={handleForm}
        >
          <input
            type="search"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="p-2 rounded w-full m-4 border-none bg-gray-100"
          />
        </form>
        <button onClick={(e) => {
            e.preventDefault();
            navigate.replace("/posts/create");
            }} className="border lg:w-fit w-full p-2 rounded-xl hover:bg-gray-50">Create Post</button>
      </div>

      {/* Order By Section */}
      <div className="mt-4">
        <span className="text-sm text-gray-500 mr-2">Order by:</span>
        <button
          onClick={handleOrderByTime}
          className="bg-teal-500 text-white px-2 py-1 rounded mr-2 hover:bg-teal-600 transition"
        >
          Time
        </button>
        <button
          onClick={handleOrderByUpvotes}
          className="bg-teal-400 text-white px-2 py-1 rounded hover:bg-teal-500 transition"
        >
          Upvotes
        </button>
      </div>

      {/* Posts List */}
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <a
            key={post._id}
            href={`/posts/${post._id}`}
            className="no-underline text-inherit"
          >
            <div className="bg-white rounded p-4 shadow hover:shadow-md transition">
              <div className="text-sm text-gray-500 mb-2">
                {post.createdAt}
              </div>
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <div className="flex items-center text-gray-500">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                <span>
                  {post.upvote} {post.upvote === 1 ? "upvote" : "upvotes"}
                </span>
              </div>
            </div>
          </a>
        ))}
      </ul>
    </main>
  );
}
