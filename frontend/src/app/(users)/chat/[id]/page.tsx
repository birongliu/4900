"use client";
import bradley from "../../../images/teams/bradley.jpeg";
import birongliu from "../../../images/teams/birongliu.jpeg";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SideBar } from "../page";
import notFound from "@/app/not-found";
import { useParams } from "next/navigation";
import io from "socket.io-client"
import Image from "next/image";
import { clerkClient } from "@clerk/nextjs/server";

interface Message {
  message: string;
  sender: string;
  type: "me" | "other";
  image: string;
}

interface Rooms {
  id: string;
  recipent: {
    sender: string;
    type: string;
    image: string;
  }[];
  messages: Message[];
}

export default function ChatMessage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');

  const data = [
    {
      sender: "Bradley",
      type: "other",
      image: bradley.src,
    },
    {
      sender: "Shaun",
      type: "other",
      image: '',
    },
    {
      sender: "birongliu",
      type: "me",
      image: birongliu.src,
    },
  ];

  // const rooms: Rooms[] = [
  //   {
  //     id: "1",
  //     recipent: data,
  //     messages: [
  //       {
  //         message: "Hello2",
  //         sender: "John Doe",
  //         type: "other",
  //         image: bradley.src,
  //       },
  //       {
  //         message: "Hi",
  //         sender: "birongliu",
  //         type: "me",
  //         image: birongliu.src,
  //       },
  //       {
  //         message: "Hello2",
  //         sender: "John Doe",
  //         type: "other",
  //         image: bradley.src,
  //       },
  //       {
  //         message: "Hi",
  //         sender: "birongliu",
  //         type: "me",
  //         image: birongliu.src,
  //       },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     recipent: data,
  //     messages: [
  //       {
  //         message: "Hellow",
  //         sender: "John Doe",
  //         type: "other",
  //         image: bradley.src,
  //       },
  //       {
  //         message: "Hi",
  //         sender: "birongliu",
  //         type: "me",
  //         image: birongliu.src,
  //       },
  //     ],
  //   },
  // ];

  const { user } = useUser();
  const [rooms] = useState<Rooms[]>([{
    id: "2",
    messages: [{ image: "", message: "", sender: "", type: "other" }],
    recipent: []
    }])
    const {
    recipent,
    messages: roomMessages,
    id: k,
  } = rooms.find((room) => room.id === id) ?? { recipent: [], messages: [] };
  const ws = io("http://localhost:3001");
  const [active, setActive] = useState<string>(Array.isArray(id) ? "" : id);
  const [messages, setMessages] = useState<Message[]>(roomMessages)
  const other = recipent.find(
    (recipent) => recipent.sender !== user?.username
  ) ?? { type: "", sender: "", image: "" };
  useEffect(() => {
    const o = async () => {
      const  k = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${user?.id}`)
      console.log(k)
    }
    o()
  }, [user?.id])
    if (!user || !user.username) return notFound();
  const submitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setMessages((prev) => [...prev, {
      message,
      sender: user.username as string,
      image: user.imageUrl,
      type: recipent ? "me" : "other",
    }])
  }
        ws.on('room message', (data) => {
      console.log("Received new message from server:", data);

            // Prevent duplicate messages (based on messageId or other unique identifier)
  });

  ws.emit("room message", { roomId: '2',
			senderId: user.id,
			reciver: 'some one',
			data: { message, sender: user.firstName, type:"me" , image: user.imageUrl } }, (req) => {
    console.log(req)
  })
  return (
    <div className="p-5 flex gap-5 h-full sticky top-2">
      <SideBar
        username={user.username}
        handleClick={setActive}
        active={active}
        friends={data
          .filter((k) => k.sender !== user.username)
          .map((recipent) => ({
            id: k ?? "",
            username: recipent.sender,
            photo: recipent.image,
          }))}
      />
      {active && k === id ? (
        <div
          className={`${
            active === "" ? "hidden" : "block"
          } w-full lg:w-[74%] h-full flex flex-col`}
        >
          <div className="p-2 flex items-center justify-start  gap-2">
            <button
              onClick={() => setActive("")}
              className="px-2 h-12 lg:hidden block"
            >
              <svg
                fill="#000000"
                className="w-5 h-5"
                height="800px"
                width="800px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 330 330"
                xmlSpace="preserve"
              >
                <path
                  id="XMLID_92_"
                  d="M111.213,165.004L250.607,25.607c5.858-5.858,5.858-15.355,0-21.213c-5.858-5.858-15.355-5.858-21.213,0.001
  l-150,150.004C76.58,157.211,75,161.026,75,165.004c0,3.979,1.581,7.794,4.394,10.607l150,149.996
  C232.322,328.536,236.161,330,240,330s7.678-1.464,10.607-4.394c5.858-5.858,5.858-15.355,0-21.213L111.213,165.004z"
                />
              </svg>
            </button>
            <div className="flex lg:items-center flex-1 gap-2">
              <Image
                src={other.image ?? ""}
                alt={`${other.sender} image`}
                width={200}
                height={200}
                className="w-10 h-10 bg-black hidden lg:block rounded-full"
              />
              <div>
                <h1 className="font-poppins text-lg text-bold">
                  {other.sender}
                </h1>
                <h1 className=" font-poppins text-base text-bold">
                  {"Online"}
                </h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Image
                src={"/chat/more.svg"}
                alt="more options"
                height={24}
                width={24}
              />
            </div>
          </div>
          <div className="h-full mt-5 relative overflow-auto rounded-xl bg-light-blue flex-col p-5 flex">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex mt-2 w-full items-center ${
                  message.type === "me" && "justify-end"
                } gap-2`}
              >
                <Image
                  src={message.image}
                  alt={`${message.sender} image`}
                  width={200}
                  height={200}
                  className={`w-12 h-12 bg-black  rounded-full ${
                    message.type === "other" ? "" : "order-2"
                  }`}
                />
                <p className="bg-light-rose p-2 rounded-xl">
                  {message.message}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={(e) => submitMessage(e)} className=" p-2 flex gap-2">
            <input
              role="dialog"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-12 resize-none p-2 rounded-xl border-2 outline-none focus:ring-2 focus:ring-light-rose"
              placeholder="Type your friend id"
            />
          </form>
        </div>
      ) : (
        <div
          className={
            "w-full lg:w-[73%] h-full flex-col  hidden lg:flex items-center justify-center font-bold text-2xl"
          }
        >
          {id !== k
            ? "Unable to select conversation"
            : "Select one of the conversations"}{" "}
        </div>
      )}
    </div>
  );
}
