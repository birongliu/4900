"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import CloseIcon from "./icons/Close";
import MenuIcon from "./icons/Menu";
import Button from "../landing/components/button";

const navigationItems = ["About", "Feature", "Contact"];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { resolvedTheme } = useTheme();
  return (
    <div
      className={`flex justify-between lg:justify-evenly items-center lg:mb-auto pt-2  ${
        isOpen ? "mb-48" : ""
      }`}
    >
      {resolvedTheme === "dark" ? (
        <Image
          src="/white-logo.svg"
          alt="pet selector logo"
          className={"w-24 h-20"}
          width={50}
          height={50}
        />
      ) : (
        <Image
          src="/black-logo.svg"
          alt="pet selector logo"
          className={"w-24 h-20"}
          width={50}
          height={50}
        />
      )}
      <ul
        className={`items-center absolute gap-2 w-full lg:relative lg:justify-center lg:top-auto top-20 flex-col flex lg:w-auto ${
          isOpen ? "block" : "hidden"
        } lg:flex lg:flex-row `}
      >
        {navigationItems.map((item, index) => (
          <li
            className="w-full px-10 py-5 inset-0 z-10 cursor-pointer hover:bg-text-secondary lg:hover:bg-in"
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center gap-1 px-5 lg:px-0">
      <Button className=" bg-black  text-white rounded-xl py-2 px-5">
          Login
        </Button>
        <button className="md:hidden block" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
  
      </div>
    </div>
  );
}
