import { cn } from "@/app/utils/functions";
import React from "react";

export default function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      height={43}
      width={50}
      viewBox="0 0 43 43"
      className={cn("stroke-darkMaroon stroke-dark-maroon dark:stroke-white", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.25 10.75L10.75 32.25"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
      <path
        d="M10.75 10.75L32.25 32.25"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
      />
    </svg>
  );
}
