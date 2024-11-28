"use client";
import React, { use, useEffect, useState } from "react";
interface AIOutput {
  animalId: string;
  name: string;
  breed: string;
  description: string;
  pictureThumbnailUrl: string;
  isAdoptionPending: boolean;
  size: string;
  health: {
    isCurrentVaccinations: boolean;
  };
}
import Image from "next/image";
import { Searchbar } from "../ui/navigation/search/search";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Hero() {
  const [result, setResult] = React.useState<AIOutput[]>([]);
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useRouter();
  const [filter, setFilter] = useState<string[]>([]);

  const fetchData = () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`)
      .then((res) => res.json())
      .then((data) => {
        const filterData = data.data.filter(
          (item: AIOutput) => item.isAdoptionPending === false
        );
        const getBreed: string[] = filterData.map((item: AIOutput) =>
          item.breed.trim().split("/")
        );
        setFilter([...new Set(getBreed.flat())]);
        setResult(filterData);
      });
  };

  useEffect(() => {
    const hello = async () => await fetchData();
    hello();
  }, []);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex bg-light-sand flex-col">
      <div className="relative p-4 pb-28 w-full ">
        <button className="mb-5 border-2 p-2 rounded-xl bg-light-ivory">
          <Link href={"/dashboard"}>Back to Dashboard</Link>
        </button>
        <div className="sticky top-2 w-full shadow-md z-10">
          <Searchbar
            title="Search for pets"
            filter={(search, item) =>
              item.breed.toLowerCase().trim().split("/").includes(search) ||
              item.name.toLowerCase() === search.toLowerCase()
            }
            data={result}
            render={(item) => (
              <div
                onClick={() => navigate.push(`/pets/${item.animalId}`)}
                className="py-2 hover:bg-light-ivory hover:cursor-pointer mt-2 w-full rounded-xl px-2 "
              >
                {item.name}
              </div>
            )}
          />
        </div>
        <div className="mt-4">
          <div className="grid mt-4 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentItems.map((item) => (
              <div
                key={item.animalId}
                onClick={() => navigate.push(`/pets/${item.animalId}`)}
                className="border-2 hover:cursor-pointer bg-light-ivory rounded-lg shadow-md p-4 flex flex-col gap-2"
              >
                <Image
                  src={item.pictureThumbnailUrl}
                  alt={item.name}
                  width={200}
                  height={200}
                  className="h-48 w-full max-w-7xl object-cover rounded-lg"
                />
                <div className="flex justify-between flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <span>{item.breed}</span>
                </div>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
