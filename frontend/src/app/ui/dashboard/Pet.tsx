"use client";
import getPet from "@/app/actions/getPets-action";
import { PaginationProps, Pet } from "@/app/utils/interface";
import Image from "next/image";
import React from "react";

export default function PetCompoent({ recommendations }: { recommendations: PaginationProps[] }) {
  const [pets, setPets] = React.useState<Pet[]>([]);

  React.useEffect(() => {
    async function fetchPets() {
      const data = await getPet();
      setPets(data);
    }
    fetchPets();
  }, []);
return (
    <div className="flex justify-center snap-mandatory overflow-x-auto">
      <div className="flex space-x-4 justify-center snap-x">
        {pets.map((pet) => (
          <div key={pet.id} className="snap-start flex-shrink-0 w-72 h-96 relative">
            <Image
              src={pet.url}
              alt={pet.name}
              width={200}
              height={200}
              className="rounded-lg w-full h-full object-center hover:shadow-lg cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
