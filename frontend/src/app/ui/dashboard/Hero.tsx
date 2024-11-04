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
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<string[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`)
        .then((res) => res.json())
        .then((data) => {
          setResult(data.data);
          const x = (data.data as AIOutput[]).map((k) =>
            k.breed.trim().split("/")
          );
          setFilter([...new Set(x.flat())]);
        });
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
    <div className="relative lg:ml-64 md:ml-20 p-4 pb-28 ">
      hello world
     </div>
  );
}
