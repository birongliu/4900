"use client";
import React from "react";
interface AIOutput {
  id: string;
  type: string;
  breed: string;
  name: string;
  description: string;
  pictureThumbnailUrl: string;
}
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import notFound from "@/app/not-found";
import Link from "next/link";

export default function Hero() {
  const [result, setResult] = React.useState<AIOutput[]>([]);
  const { user, isSignedIn } = useUser();

  React.useEffect(() => {
    const fetchData = async () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`)
        .then((res) => res.json())
        .then((data) => {
          setResult(data.data);
          const x = (data.data as AIOutput[]).map((k) =>
            k.breed.trim().split("/")
          );
        });
    };
    fetchData();
  }, []);

  const [activeSlide, setActiveSlide] = React.useState(0);

  if (!isSignedIn || !user) {
    notFound();
    return;
  }

  const recommendedPets = user.publicMetadata.onboardingAIOutput as AIOutput[];

  const otherPets = result
    .filter((k) => recommendedPets.some((s) => s.name !== k.name))
    .slice(0, 10);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % otherPets.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + otherPets.length) % otherPets.length);
  };

  return (
    <div className="relative lg:ml-64 md:ml-20 p-4 pb-28 ">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-[#3D0C3C]">Dashboard</h1>
          <p className="text-xl text-gray-600">
            Welcome back, {user.firstName}!
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-baseline">
            <div>
              <h2 className="text-2xl font-bold text-[#3D0C3C]">Recommended</h2>
              <p className="text-gray-600">
                Tailored picks based on your preferences.
              </p>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {(recommendedPets ?? []).map((pet) => (
              <div key={pet.id} className="flex snap-start">
                <div className="rounded-3xl overflow-hidden aspect-square">
                  <Link href={`/pets/${pet.id}`}>
                  <Image
                    src={pet.pictureThumbnailUrl}
                    alt={pet.name}
                    width={280}
                    height={280}
                    className="object-cover mix-blend-multiply aspect-[2/2]"
                  />
                  </Link>
                </div>
              </div>
            ))}
            <button
              className="flex-none self-center"
              aria-label="Next recommendations"
            ></button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[#3D0C3C]">
            Other Pet Suggestions
          </h2>
          <button className="text-gray-600">
            <Link href="/pets">See more</Link>
          </button>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              className={`flex transition-transform duration-300 ease-in-out`}
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {otherPets.map((pet) => (
                <div key={pet.id} className="flex-none relative w-full">
                  <Image
                    src={pet.pictureThumbnailUrl}
                    alt={pet.type}
                    width={800}
                    height={100}
                    className=" w-full aspect-[2/1]"
                  />
                  <div className="absolute bottom-12 snap-mandatory  left-6 text-3xl lg:text-5xl flex-col md:bottom-24 flex text-white">
                    <span className="md:text-4xl">{pet.name}</span>
                    <span className="text-xl md:text-2xl">{pet.breed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute left-4 bg-black top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
            onClick={prevSlide}
            aria-label="Previous pet"
          ></button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
            onClick={nextSlide}
            aria-label="Next pet"
          ></button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {otherPets.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeSlide ? "bg-[#3D0C3C]" : "bg-gray-300"
                }`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
