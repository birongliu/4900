"use server";

export default async function getAllPostAction() {
  const response = await fetch(`${process.env.API_URL}/api/post`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("An error occurred while fetching the post");
  }
  return await response.json();
}

interface PostData {
  title: string;
  imageUrl: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

export async function createPostAction(data: PostData) {
  const response = await fetch(`${process.env.API_URL}/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("An error occurred while creating the post");
  }
  return await response.json();
}

export async function getPostByIdAction(id: string) {
  const response = await fetch(`${process.env.API_URL}/api/post/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("An error occurred while fetching the post");
  }
  return await response.json();
}

export async function deletePostAction(id: string) {
  const response = await fetch(`${process.env.API_URL}/api/post/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("An error occurred while deleting the post");
  }
  return await response.json();
}


export async function updateVote({ id, vote }: { id: string; vote: number }) {
  const response = await fetch(`${process.env.API_URL}/api/post/${id}`, {
    method: "PUT",
    body: JSON.stringify({ upvote: vote, id }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("response", response);
  if (!response.ok) {
    throw new Error("An error occurred while updating the vote");
  }
  console.log(response);
  return await response.json();
}


export async function addComment(userId: string, { comment, id }: { comment: string, id: string }) {
    console.log(id, comment)
    const response = await fetch(`${process.env.API_URL}/api/post/${id}/commentPost`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment, userId  }),
    });
    console.log("response", response);
    if (!response.ok) {
        throw new Error("An error occurred while creating the comment");
    }
    return await response.json();
    
}