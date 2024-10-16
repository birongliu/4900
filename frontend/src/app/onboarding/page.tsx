"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import PanelProgressBar from "@/app/ui/onboarding/PanelProgressBar";
import Shape from "@/app/ui/shared/Shape";
import { ExperienceForm, PetSizeForm } from "@/app/ui/onboarding/forms";
import { ActionType, FormData, ProgressItemProps } from "@/app/utils/interface";
import { completeOnboarding } from "./actions";
import IntroductionForm from "@/app/ui/onboarding/forms/IntroductionForm";
import QualitiesForm from "../ui/onboarding/forms/QualitiesForm";
import PetTypeForm from "../ui/onboarding/forms/PetTypeForm";
import BreedTypeForm from "../ui/onboarding/forms/BreedTypeForm";
import ResultForm from "../ui/onboarding/forms/ResultForm";

const progressItems: ProgressItemProps[] = [
  {
    id: "Introduction",
    question: "Application Name",
    status: "incomplete",
    actions: ["next"],
    completedColor: {
      from: "from-[rgb(227,205,10)]",
      to: "to-[rgb(227,205,160)]",
    },

    component: (options) => <IntroductionForm {...options} />,
  },
  {
    id: "Experience",
    question: "What is your experience level with pets?",
    status: "incomplete",
    actions: ["previous", "next"],
    completedColor: {
      from: "from-[rgb(227,205,173)]",
      to: "to-[rgb(227,205,173)]",
    },
    component: (options) => <ExperienceForm {...options} />,
  },
  {
    id: "PetSize",
    actions: ["previous", "next"],
    question: "What size pet are you considering?",
    status: "incomplete",
    completedColor: {
      from: "from-[rgb(227,205,173)]",
      to: "to-[rgb(167,137,123)]",
    },
    component: (options) => <PetSizeForm {...options} />,
  },
  {
    id: "AnimalType",
    question: "What type of pet are you interested in adopting?",
    status: "incomplete",
    actions: ["previous", "next"],
    completedColor: {
      from: "from-[rgb(167,137,123)]",
      to: "to-[rgb(167,137,123)]",
    },
    component: (options) => <PetTypeForm {...options} />,
  },
  {
    id: "BreedType",
    question: "What breed(s) do you prefer?",
    status: "incomplete",
    actions: ["previous", "next"],
    completedColor: {
      from: "from-[rgb(167,137,123)]",
      to: "to-[rgb(96,56,64)]",
    },
    component: (options) => <BreedTypeForm {...options} />,
  },
  {
    id: "Qualities",
    actions: ["previous", "next"],
    question: "What qualities are you looking for in a pet?",
    completedColor: {
      from: "from-[rgb(96,56,64)]",
      to: "to-[rgb(47,0,22)]",
    },
    status: "incomplete",
    component: (options) => <QualitiesForm {...options} />,
  },
  {
    id: "Result",
    actions: ["previous", "submit"],
    question: "Review",
    completedColor: {
      from: "from-[rgb(227,205,173)]",
      to: "to-[rgb(227,205,173)]",
    },
    status: "incomplete",
    component: (options) => <ResultForm {...options} />,
  },
];

export default function OnboardingComponent() {
  const { user } = useUser();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<FormData>({
    Experience: "",
    PetSize: "",
    Introduction: "",
    Result: "",
    AnimalType: "",
    BreedType: "",
    Qualities: "",
  });

  const handleFormSubmit = async (formData: FormData) => {
    setLoading(true);
    await completeOnboarding(formData);
    if (user) await user.reload();
    setLoading(false);
    console.log("User Onboarding Completed");
    router.push("/dashboard");
  };

  const handleSubmit = () => {
    handleFormSubmit(formData);
  };

  function handleNext(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const current = getProgressItem(progressItems, currentStep);
    if(current.id !== "Introduction" && !formData[current.id]) {
     setMessage("Please fill out the form before proceeding");
     return;
    };
    const next = getProgressItem(progressItems, currentStep + 1);
    setCurrentStep((prev) => prev + 1);
    current.status = "completed";
    next.status = "current";
  }

  function handleBack(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if(message) setMessage("");
    const current = getProgressItem(progressItems, currentStep);
    const prev = getProgressItem(progressItems, currentStep - 1);
    setCurrentStep((prev) => prev - 1);
    current.status = "incomplete";
    prev.status = "current";
  }

  function handleFormData(key: string, value: string | string[]) {
    setMessage("");
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  const actions: Record<
    ActionType,
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  > = {
    next: handleNext,
    previous: handleBack,
    submit: handleSubmit,
  };

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

  function getPosition<T extends any[]>(item: T, currentStep: number) {
    return Math.min(item.length - 1, currentStep);
  }

  const prev = getProgressItem(progressItems, currentStep - 1);
  const current = getProgressItem(progressItems, currentStep);
  const next = getProgressItem(progressItems, currentStep + 1);
  current.status = "current";

  return (
    <div className="mb-20">
      <Shape className="-top-24 -left-12" />
      <Shape className="right-0 -top-24 w-32 overflow-hidden" />
      <div className="bg-slate-400 mx-2 md:mx-12 rounded-xl p-5 h-full">
      <PanelProgressBar progressItems={progressItems} />
      {current.component({
            currentItem: current,
            formData,
            handleFormData: (data) => handleFormData(current.id, data),
            nextData: { id: next.id, data: formData[next.id] },
            previousData: { id: prev.id, data: formData[prev.id] },
            data: formData[current.id]
          })}
      </div>
      <div className="bg-slate-500 w-full flex items-center justify-end fixed bottom-0">
      {message && <p className="text-white font-poppins text-sm text-center">{message}</p>}
        <div className="flex gap-2 p-3">
          {current.actions.map((action, i) => (
            <button
              disabled={action === "submit" && loading}
              onClick={actions[action].bind(formData[current.id])}
              className={`w-full uppercase bg-darkMaroon rounded-lg text-white p-2`}
              key={action}
            >
              {i === 0 && action === "next" ? "Start": action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
