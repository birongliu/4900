'use client';
import { createPostAction } from '@/app/actions/post-action';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Create() {
  const navigate = useRouter();
  const { user } = useUser();
  const [image, setImage] = useState<string | null>(null);

  if (!user) {
    navigate.replace("/");
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;
    const imageUrl = (form.elements.namedItem('imageUrl') as HTMLInputElement).value;

    const post = {
      title,
      createdBy: user.id,
      content,
      imageUrl
    };

    // Save post to the database
    await createPostAction({
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
        createdBy: post.createdBy,
        createdAt: new Date().toISOString(),
    });

    // Navigate back to the home page
    navigate.replace("/posts");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-teal-50 p-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              required
              className="w-full p-2 border border-gray-300 rounded-md text-lg"
            />
          </div>
          <div className="mb-4">
            <textarea
              id="content"
              name="content"
              placeholder="Content (Optional)"
              className="w-full p-2 border border-gray-300 rounded-md text-lg min-h-[150px] resize-none"
            ></textarea>
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="secret"
              name="secret"
              placeholder="Secret code (Optional)"
              className="w-full p-2 border border-gray-300 rounded-md text-lg"
            />
          </div>
          <div className="mb-4">
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              placeholder="Image URL (Optional)"
              className="w-full p-2 border border-gray-300 rounded-md text-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 text-white rounded-md text-lg font-semibold hover:bg-teal-600 transition"
          >
            Create Post
          </button>
          <a href="/posts" className="block mt-4">
            <button
              type="button"
              className="w-full py-3 bg-gray-500 text-white rounded-md text-lg font-semibold hover:bg-gray-600 transition"
            >
              Back
            </button>
          </a>
        </form>
      </div>
    </div>
  );
}
