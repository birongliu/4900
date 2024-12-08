"use server";
export default async function getPetById(id: string) {
  const data = await fetch(
    `${process.env.API_URL}/api/pets/${id}`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  const response = await data.json();
  return response.data;
}
