import { OnboardingComponentProps } from "@/app/utils/interface";
import React from "react";

const level = ["Beginner", "Intermediate", "Experienced"];

export default function QualitiesForm({
  currentItem,
  handleFormData,
  data,
}: OnboardingComponentProps) {
  const [qualities, setQaulities] = React.useState<string>(data);

  function handleButton(e:React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setQaulities(e.target.value);
    handleFormData(qualities);
  }

  return (
    <div className="w-full py-5 md:mb-24">
    <div className="py-2">
      <h1 className="text-2xl font-bold font-poppins text-center py-2">
        {currentItem.question}
      </h1>
      <p className="font-semibold text-center">
        We&apos;d love to know what qualities you&apos;re looking for in a pet.
        Please share your preferences below.
      </p>
      </div>
      <form action="." id="onboarding-form">
      <textarea
        value={qualities}
        form="onboarding-form"
        required
        onBlur={(e) => handleButton(e)}
        onKeyDown={(e) => e.key === "Enter" && handleFormData(qualities)}
        onChange={e => setQaulities(e.target.value)}
        className="w-full px-2 py-2 resize-none h-40 rounded-lg border border-gray-300"
        name="quality"
        id="qaulity"
        placeholder="I'm looking for a pet that is..."
      ></textarea>
      </form>
    </div>
  );
}
