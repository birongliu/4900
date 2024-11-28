"use client";

import { ContextUser, Room, UserContext } from "@/app/context/getUserContext";
import { redirect, useParams } from "next/navigation";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import { SideBar } from "../page";
import FriendList from "@/app/ui/chat/FriendList";
import Image from "next/image";
import { SocketContext } from "@/app/context/SocketContext";
import { Socket } from "socket.io-client";
import { v4 } from "uuid";
export interface Message {
  message: string;
  sender: string;
  image: string;
  id?: string;
}

export default function Chat() {
  const { id } = useParams();
  const context = useContext(UserContext);
  const socket = useContext(SocketContext);
  if(!socket || !context) return null;
  const room = context.rooms.find((r) => r.roomId === id);
  return room ? (
    <ChatRoom socket={socket.socket} room={room} context={context} />
  ) : (
    <ChatRoom socket={socket.socket} room={undefined} context={context} />
  );
}

export function ChatRoom({
  room,
  context,
  socket
}: {
  room: Room | undefined;
  context: ContextUser;
  socket: Socket,
}) {
  const [activeRoom, setActiveRoom] = useState("");
  const [message, setMessage] = useState<Message>({ message: "", sender: "",  image: "" });
  const [messages, setMessages] = useState<Message[]>(room ? room.messages : []);
  const messageRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState("");
  const [toggleFriendButton, setToggleFriendButton] = useState(true);
  const other = room && room.recipients.find((r) => r.username !== context.username);

  
  const handleMessages = (e: FormEvent) => {
    e.preventDefault();
    console.log("in handle messages")
    if(message.message.trim() === "") {
      setError("Message cannot be empty");
      return;
    }
    const constructMessage = {
      sender: context.username,
      message: message.message,
      image: context.imageUrl,
      id: v4(),
    } as Message;
    const constructMessageWithRoom = {
      message: constructMessage,
      roomId: room?.roomId,
      sender: context,
      reciver: other,
    }
    socket.emit("room message", constructMessageWithRoom)
    setMessages((prevMessages) => [...prevMessages, constructMessage]);
    setMessage({ message: "", sender: "", image: "", id: "" });
  }
  useEffect(() => {
    console.log("use effect");
    if (messageRef.current) {
      messageRef.current.scroll({ top: messageRef.current.scrollHeight, behavior: "smooth" });
    }
    socket.emit("join room", room && room.roomId);
    socket.on("room message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("room message");
    }
  }, [socket, room])

  useEffect(() => {
    const initalize = () => {
      if(!room) return;
      const { roomId, messages } = room;
      setActiveRoom(roomId ?? "");
      setToggleFriendButton(true);
      setMessages(messages);
    }
    initalize()
  }, [room, socket])

  return (
    <div className="flex overflow-auto w-full h-full">
      <SideBar
        username={context.username}
        active={activeRoom}
        handleFriend={function (): void {
          throw new Error("Function not implemented.");
        }}
        addFriend={function (id: string): void {
          throw new Error("Function not implemented.");
        }}
        toggleFriendButton={toggleFriendButton}
        handleClick={(id) => {
          if (activeRoom) {
            setActiveRoom("");
            setToggleFriendButton(true);
            return;
          }
          setToggleFriendButton(false);
          setActiveRoom(room?.roomId ?? "");
          redirect(`/chat/${id}`);
        }}
        rooms={context.rooms
          .filter(
            (value, index) =>
              value.recipients.filter((r) => r.id !== context.id).length > 0
          )
          .map((value, index) => {
            let otherUser = value.recipients.find(
              (u) => u.username !== context.username
            );
            if (!otherUser) otherUser = { id: "", imageUrl: "", username: ""};
            return {
              roomId: value.roomId,
              id: otherUser.id,
              username: otherUser.username,
              imageUrl: otherUser.imageUrl,
            };
          })}
      />
      {activeRoom === room?.roomId && (
        <div
          className={` ${
            activeRoom === "" ? "hidden" : "block"
          } w-full lg:w-[74%] h-full flex flex-col`}
        >
          <div className="p-2 flex items-center justify-start  gap-2">
            <button
              onClick={() => setActiveRoom("")}
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
                src={other?.imageUrl ?? ""}
                alt={`${""} image`}
                width={200}
                height={200}
                className="w-10 h-10 bg-black hidden lg:block rounded-full"
              />
              <div>
                <h1 className="font-poppins text-lg text-bold">
                  {other?.username ?? ""}
                </h1>
                <h1 className=" font-poppins text-base text-bold">
                  {"Online"}
                </h1>
              </div>
            </div>
            <div className="flex gap-2">
              <Image
                src={other?.imageUrl ?? ""}
                alt="more options"
                height={24}
                width={24}
              />
            </div>
          </div>
          <div ref={messageRef} className="h-[75%] mt-5 relative overflow-auto rounded-xl bg-light-blue flex-col p-5 flex">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex mt-2 w-full items-center ${
                 message.sender === context.username ? "justify-end" : "justify-start"
                } gap-2`}
              >
                <Image
                  src={message.image}
                  alt={`${message.sender} image`}
                  width={200}
                  height={200}
                  className={`w-12 h-12 bg-black  rounded-full ${
                   message.sender === context.username ? "order-1" : "order-none"
                  }`}
                />
                <p className="bg-light-rose p-2 rounded-xl">
                  {message.message}
                </p>
              </div>
            ))}
          </div>
          {error && <p className="text-red-500 flex justify-center">{error}</p>}
          <form onSubmit={(e) => handleMessages(e)} className=" p-2 flex gap-2">
            <input
              role="dialog"
              id="message"
              value={message.message}
              onChange={(e) => {
                if(error) setError("");
                console.log("message", e.target.value);
                setMessage({ id: message.id, message: e.target.value, sender: context.username, image: context.imageUrl })
              }}
              className="w-full h-12 resize-none p-2 rounded-xl border-2 outline-none focus:ring-2 focus:ring-light-rose"
              placeholder="Type your message"
            />
          </form>
        </div>
      )}
      {(
        <FriendList
          rooms={context.rooms}
          me={context}
          active={toggleFriendButton && activeRoom === ""}
          friends={context.friends}
        />
      )}
    </div>
  );
}
