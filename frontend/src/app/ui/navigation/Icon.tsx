"use client"
import Image from "next/image";
import React from "react";

export default function Icon({
  data,
}: {
  data: { imageUrl: string; id: string };
}) {
  const [isOpen, setOpen] = React.useState(false);
  return (
    <button onClick={() => setOpen(!isOpen)}>
      <Image
        src={data.imageUrl}
        alt={data.id}
        width={25}
        height={25}
        className="w-20 h-20 rounded-full mb-2"
      />
    </button>
  );
}
