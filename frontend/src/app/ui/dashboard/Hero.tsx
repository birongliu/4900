import { getUser } from "@/app/actions/getUser-action";
import React, { useEffect } from "react";
import Pagination from "../shared/pagination";
import PetCompoent from "./Pet";
import { redirect } from "next/navigation";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
interface AIOutput {
  id: string;
  type: string;
  breed: string;
  name: string;
  description: string;
  imgUrl: string;
}



export default async function Hero() {
  const data = await getUser();
  if (!data) {
    redirect("/login");
  };
  const result = data.publicMetadata.onboardingAIOutput as AIOutput[];

  return (
    <div className="flex bg-gray-100 w-full lg:pl-64 flex-col">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back, {data.firstName}</p>

        {/* Recommended Section */}
        <div className="bg-white p-6 rounded-lg shadow flex-col flex items-center">
          <h2 className="text-xl font-semibold mb-4">Recommandation</h2>
          <span className="text-gray-600 border-black" />
          <p className="text-gray-600 ml-1 mb-4">
            Tailored picks based on your preferences
          </p>
          <div className="hidden lg:flex gap-3 ">
          {result !== undefined ? result.map((k) => (
            <div key={k.id} className="flex flex-col items-center gap-4">
              <Image
                src={k.imgUrl}
                alt={k.name}
                width={200}
                height={200}
                className="w-48 h-48 rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{k.name}</h3>
                <p className="text-gray-600">{k.description}</p>
              </div>
            </div>
          )) : <div> No data </div>}
           </div>
           <UserButton />
          <Pagination
            progressItems={result !== undefined ? result.map((k) => ({
              id: k.id,
              image: k.imgUrl,
              title: k.name,
            })) : []}
          />
        </div>
      </div>
      <section>
        <div className="flex justify-between items-center mb-4 px-10">
          <h2 className="text-xl font-semibold">Other Pet Suggestions</h2>
          <a href="/pets" className="text-purple-600 hover:underline">
            See more
          </a>
        </div>
        <div className="px-14 py-4 flex items-center gap-2">
          <PetCompoent recommendations={result.map(k => ({
            id: k.id,
            name: k.name,
            url: k.imgUrl,
          }))} />
        </div>
      </section>
    </div>
  );
}
