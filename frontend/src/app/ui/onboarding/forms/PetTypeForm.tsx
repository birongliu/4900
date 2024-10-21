import { OnboardingComponentProps } from "@/app/utils/interface";
import React from "react";

const level = ["Dog", "Cat"];

export default function PetTypeForm({
  currentItem,
  handleFormData,
  data,
}: OnboardingComponentProps) {
  const [selected, setSelected] = React.useState(data);
  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault()
    setSelected(e.currentTarget.id);
    handleFormData(e.currentTarget.id);
  }

  return (
    <div className="w-full py-5">
    <div className="py-2">
      <h1 className="text-2xl font-bold font-poppins text-center py-2">
        {currentItem.question}
      </h1>
    </div>
    <ul className="grid md:grid-cols-2 grid-cols-1 gap-3 py-5">
        {level.map((item) => (
          <li id={item} onClick={handleClick} key={item} className={`border rounded-full py-2 cursor-pointer ${selected === item ? "bg-slate-500" : "bg-inherit"} `}>
            <input className={`pointer-events-none opacity-0 cursor-pointer`} type="radio" name={item} id={item} />
            <label className="cursor-pointer" htmlFor={item}>{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
