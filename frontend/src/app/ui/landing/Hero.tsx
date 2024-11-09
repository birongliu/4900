import React from "react";
import Shape from "../shared/Shape";
import Vector from "../shared/Vector";
import Image from "next/image";
import Button from "../shared/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className=" my-28 flex items-center px-16 md:px-16 justify-center">
      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-24 justify-center">
        <div className="space-y-6 relative">
        <Vector className="z-10 md:w-96 md:h-96 h-10 w-10" />
        <Shape className="-top-10 right-32 md:h-52 md:w-52" />
          <span className="font-bold font-poppins text-yellow-600">
            Pet Adoption
          </span>
          <h1 className="text-3xl dark:text-pureWhite md:text-3xl font-bold font-poppins text-primary leading-tight">
            Adopt, Grow, and Build a Community—One Paw at a Time
          </h1>
          <p className="text-primary dark:text-pureWhite  text-lg font-poppins text-left">
            Adopt, connect, and grow together at Petpals. We bring pet lovers
            together by creating a community where you can find your perfect
            companion and connect with others who share the same passion for
            pets. Let&apos;s build meaningful relationships while giving animals
            the homes they deserve.
          </p>
          <Button className="flex hover:cursor-pointer items-center space-x-2 text-pretty font-semibold dark:bg-white dark:text-black bg-black text-white">
          <Link href="/dashboard">
            Get Started
          </Link>
          </Button>
        </div>
        <div className="lg:flex justify-center hidden h-full">
          <Image
            key="pet"
            src="/hero/hero-picture.svg"
            alt="hero"
            width={300}
            height={300}
            className="rounded-lg object-cover w-96 h-96"
          />
        </div>
      </div>
    </section>
  );
}
