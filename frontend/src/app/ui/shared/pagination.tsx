"use client";
import Image from "next/image";
import React, { useState } from "react";
import PanelProgressBar from "../onboarding/PanelProgressBar";

interface ProgressItemProps {
  id: string;
  image: string;
  title: string;
}

export default function Pagination({
  progressItems,
}: {
  progressItems: ProgressItemProps[];
}) {
  const [currentStep, setCurrentStep] = useState(0);
  if(progressItems.length === 0) return null;

  function getPosition<T extends any[]>(item: T, currentStep: number) {
    return Math.min(item.length - 1, currentStep);
  }

  function getProgressItem<T extends ProgressItemProps>(
    items: T[],
    currentPosition: number
  ) {
    const position = getPosition(items, currentPosition);
    if (position < 0) {
      return items[0];
    }

    if (position > items.length) {
      return items[items.length - 1];
    }

    return items[position];
  }
  const current = getProgressItem(progressItems, currentStep);

  function handleNext(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (currentStep >= progressItems.length - 1) {
      setCurrentStep(0);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  }

  function handleBack(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (currentStep <= 0) {
      setCurrentStep(progressItems.length - 1);
      return;
    }
    setCurrentStep((prev) => prev - 1);
  }

  return (
    <div className="flex flex-col lg:hidden"> 
    <div className="lg:hidden flex justify-center items-center gap-2 w-full">
      <button
        className="transform bg-white rounded-full p-2 shadow-md"
        onClick={handleBack}
      >
        {"<"}
      </button>
      <Image
        src={current.image}
        alt={`${current.id} ${current.title}`}
        width={300}
        height={300}
        className="w-full h-96 rounded-xl object-fit object-center"
      />
      <button
        className="transform bg-white rounded-full p-2 shadow-md"
        onClick={handleNext}
      >
        {">"}
      </button>
    </div>
    <PanelProgressBar className="rounded-full flex justify-center items-center" progressItems={progressItems.map((prev) => ({
        completedColor: { type: "completed", from: "from-[rgba(0,0,0,0)]", to: "to-[rgba(0,0,0,0)]" },
        question: prev.title,
        status: prev.id === current.id ? "current" : "completed",
    }))} />
    </div>
  );
}
