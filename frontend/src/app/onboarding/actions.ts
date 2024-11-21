"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { FormData } from "../utils/interface";

export const completeOnboarding = async (formData: FormData) => {
  const { userId } = auth();
  if (!userId) return { message: "User not found" };
  const result = await fetchAIOnboardingResult({
    Experience: formData.Experience,
    PetSize: formData.PetSize,
    AnimalType: formData.AnimalType,
    BreedType: formData.BreedType,
    Qualities: formData.Qualities,
  })
  console.log("here is the result", result)
  try {
    const user = clerkClient().users;
    console.log(result)
    await user.updateUserMetadata(userId, {
      publicMetadata: {
        onboardingComplete: true,
        onboardingAIOutput: result
      },
    });

  } catch (error) {
    console.error(error);
    return { message: "Error" };
  }
};



async function fetchAIOnboardingResult(
  formData: Omit<FormData, "Result" | "Introduction">
) {
  console.log("here is the form data", formData)
  const data = await fetch(
    `${process.env.API_URL}/api/ai`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Cache-Control': 'max-age=3600',
      },
      body: JSON.stringify({ message: JSON.stringify(formData) }),
    }
  );
  console.log("here is the data", data)
  if(data.status !== 200) return null;
  const response = await data.json();
  console.log("here is the response", response)
  return response;
}

/**
 * import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const ctx = await request.json()
  const response = await fetch(`${process.env.API_URL}/api`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=3600',
    },
    body: JSON.stringify({ message: JSON.stringify(ctx) }),
  })
  console.log(response)
  if(response.status !== 200) { 
    return NextResponse.json({ data: { message: 'Error' }}, { status: 500 });
  }
  const data = await response.json();
  return NextResponse.json({ data: data, status: 200 });
}


export async function GET() {
  const data = await fetch("https://data.cityofnewyork.us/resource/8nqg-ia7v.json")
  if(data.status !== 200) { 
    return NextResponse.json({ data: { message: 'Error' }}, { status: 500 });
  }
  const response = await data.json();
  return NextResponse.json({ data: response, status: 200 });
}
 * 
 */