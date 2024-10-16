"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { Pet } from "@/app/utils/interface";
import Image from "next/image";
export default function Dashboard() {
  const { user, isSignedIn } = useUser();
  const pets =
    isSignedIn && user.publicMetadata.onboardingAIOutput !== null
      ? (user.publicMetadata.onboardingAIOutput as Pet[])
      : undefined;
  return (
    <div className="px-12 py-5">
      <h1 className="text-xl font-bold uppercase">
        Welcome Back, {user?.firstName}
      </h1>
      <div className="py-1">
        <h2 className="text-2xl font-bold py-2 text-center uppercase">
          Recommended Pets
        </h2>
        {pets ? (
          <ul className="flex gap-2 justify-center">
            {pets.map((pet) => (
              <div className="text-center py-2" key={pet.name}>
                <Image
                  src={pet.imgUrl}
                  alt={pet.name}
                  width={100}
                  height={100}
                  className="w-auto h-72 rounded-xl"
                />
                <h1>{pet.name}</h1>
                <h2>{pet.type}</h2>
                <h3>{pet.breed}</h3>
              </div>
            ))}
          </ul>
        ) : (
          <div className="text-center">You dont have recommanded pets</div>
        )}
      </div>
    </div>
  );
}
