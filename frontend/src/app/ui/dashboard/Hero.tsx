"use client";
import React, { useState } from "react";
interface AIOutput {
  id: string;
  type: string;
  breed: string;
  name: string;
  description: string;
  pictureThumbnailUrl: string;
}
import Pagination from "./Pagination";
import Image from "next/image";
import { Searchbar } from "../navigation/search/search";

export default function Hero() {
  const [result, setResult] = React.useState<AIOutput[]>([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  React.useEffect(() => {
    const fetchData = async () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`)
        .then((res) => res.json())
        .then((data) => setResult(data.data));
    };
    fetchData();
  }, []);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

  // Handler for page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative lg:ml-64 md:ml-20 p-4 pb-28">
      <Searchbar filter={(search, item) => item.name.toLowerCase() === search.toLowerCase()} data={result} render={(item) => (<div>{item.name}</div>)} />
      <div className="mt-4">
      <Pagination
        totalItems={result.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div className="grid mt-4 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {currentItems.map((item) => (
          <div
            key={item.id}
            className="border-2 rounded-lg shadow-md p-4 flex flex-col gap-2"
          >
            <Image
              src={item.pictureThumbnailUrl}
              alt={item.name}
              width={200}
              height={200}
              className="h-48 w-full object-cover rounded-lg"
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
  );
}
