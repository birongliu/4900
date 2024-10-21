import { OnboardingComponentProps } from "@/app/utils/interface";
import React from "react";

export default function IntroductionForm({
  currentItem,
}: OnboardingComponentProps) {
  const introductionMessage = `Welcome to the onboarding process! You are currently on ${currentItem.id} step. Please follow the instructions to complete this step. This process is designed to help you get started quickly and efficiently. If you have any questions, feel free to reach out to our support team. Let's get started!`;
  return (
    <div className="h-96 w-full">
      <div className="flex items-center justify-center flex-col py-4">
        <h1 className="uppercase font-poppins text-2xl font-bold">
          {currentItem.id}
        </h1>
        <p className="text-center mt-2 font-poppin">{introductionMessage}</p>
      </div>
    </div>
  );
}
