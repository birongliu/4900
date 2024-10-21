import { OnboardingComponentProps } from "@/app/utils/interface";
import React from "react";

export default function ResultForm({
  formData,
  currentItem,
}: OnboardingComponentProps) {
  const data = Object.entries(formData).filter(k => k[0] !== "Result" && k[0] !== "Introduction");
  return (
    <div className="w-full py-5">
      <div className="py-2">
        <h1 className="text-2xl font-bold font-poppins text-center py-2">
          {currentItem.question}
        </h1>
      </div>
      <div className="grid grid-cols-2  gap-3 py-5">
        {data.map(([key, value], index) => (
          <div
            className={`border p-2  cursor-pointer ${
              index === data.length - 1 ? "col-span-2" : ""
            }`}
            key={key}
          >
            {key}: {key === "BreedType" && Array.isArray(value) ? value.join(", ") : value}
          </div>
        ))}
      </div>
    </div>
  );
}
