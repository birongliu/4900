"use server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { FormData, OnboardingResultOptions } from "../utils/interface";

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
  try {
    const user = clerkClient().users;
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
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/onboarding`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  if(data.status !== 200) return null;
  const response = await data.json();
  return response.data;
}