import Arrow from "@/app/ui/landing/components/Arrow";
import Link from "next/link";
import React from "react";

export default function page() {
  return <div className="container mx-auto px-4 py-8">
    <Link href="/pets"> 
     <button className="mb-4 border p-2 rounded-xl hover:bg-light-mint">
        ⬅ Back to all pets
      </button>
      </Link>
  </div>;
}
