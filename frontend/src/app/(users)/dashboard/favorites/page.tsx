'use client'
import { useState, useEffect } from "react";
import { Heart, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

interface Pet {
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
    isFavorited: boolean;
}

export default function FavoritesPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();

  useEffect(() => {
    const fetchFavorites = async () => {
        try {
          if (!user) return;
        setLoading(true);
        const response = await fetch(`http://localhost:3001/api/users/getFavorites/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch favorite pets");
        }

        const data = await response.json();
        setPets(
          data.pets.map((pet: any) => ({
            id: pet.id,
            name: pet.name,
            breed: pet.breed,
            pictureThumbnailUrl: pet.pictureThumbnailUrl,
            isFavorited: true,
          }))
        );
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  if (loading) return <div className="text-center py-20">Loading favorite pets...</div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <div className="min-h-screen ml-64 bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Favorites</h1>
            <p className="text-gray-500 mt-2">
              Your perfect companions, unforgettable faces, ready to fill your heart and home with love.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {pets.map((pet) => (
            <div key={pet.animalId} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-[300px]">
                <Image
                  src={`${pet.pictureThumbnailUrl}`}
                  alt={`Photo of ${pet.name}`}
                  width={800}
                  height={400}
                  className="w-full h-[400px] object-cover"
                />
                <button className="absolute top-2 right-2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
                  <Heart className={`h-5 w-5 ${pet.isFavorited ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{pet.name}</h3>
                <p className="text-gray-500">{pet.breed}</p>
              </div>
            </div>
          ))}
          <button className="absolute -right-12 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors">
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
