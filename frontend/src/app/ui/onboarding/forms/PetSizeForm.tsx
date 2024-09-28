import { OnboardingComponentProps } from "@/app/utils/interface";
import Image from "next/image";
import React from "react";

const options: { url: string; name: "Small" | "Medium" | "Large" }[] = [
  { url: "./onboarding/small.svg", name: "Small" },
  { url:   "./onboarding/medium.svg", name: "Medium" },
  { url:  "./onboarding/large.svg", name: "Large" },
];
export default function PetSizeForm({
  progressItem,
  handleFormData,
  data,
}: OnboardingComponentProps) {
  const [selected, setSelected] = React.useState<string | null>(data);

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault()
    setSelected(e.currentTarget.id);
    handleFormData(e.currentTarget.id);
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold font-poppins text-center py-2">
        {progressItem.question}
      </h1>
      <ul className="grid lg:grid-cols-3 gap-5 py-10">
        {options.map((item) => (
          <li
            key={item.name}
            id={item.name}
            onClick={handleClick}
            className={`border flex justify-center p-2 rounded-xl  ${selected === item.name ? "bg-slate-500" : "bg-inherit"}`}
          >
            <div id={item.name}  className="flex py-5 flex-col justify-center items-center"> 
            <Image src={item.url} alt={`${item.name} pet selection`} width={200} height={200} />
            <h1 className="font-bold text-3xl">{item.name}</h1>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
