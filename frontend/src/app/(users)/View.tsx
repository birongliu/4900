"use client";
import { useUser } from "@clerk/nextjs";
import { FormEvent, useState } from "react";
import { useTheme } from "next-themes";
import { updateUser } from "../actions/updateUser-action";

export const ViewProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [toggle, setToggle] = useState(false);
  const [selected, setSelected] = useState("");
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [dataTheme, setDataTheme] = useState(theme);
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user) {
      await updateUser(user.id, {
        username: selected,
      });
    }
  }

  return (
    <div className="container mx-auto">
      <form onSubmit={onSubmit} className="py-5">
        <div className="flex flex-col mb-2">
          <label className="text-gray-400 dark:text-white">username</label>
          <input
            type="text"
            minLength={3}
            className="border-b-2 bg-transparent py-2 text-black border-gray-400 focus:outline-none"
            placeholder={user.username ?? ""}
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-white dark:bg-white dark:text-black border w-full py-2 bg-dark-maroon rounded-xl"
        >
          Submit
        </button>
      </form>
      <div className="flex py-2 flex-col">
        {/* <label className="text-gray-400">Theme</label>
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="cursor-pointer  border rounded-lg p-2 flex justify-between"
        >
          <span className="text-black dark:text-white">{dataTheme}</span>
          <div className="text-black dark:text-white">a</div>
        </div>
        <div className={`border ${toggle ? "block" : "hidden"}  p-2 mt-2`}>
          {themes.map((l) => (
            <div
              key={l.name}
              className="flex p-2 gap-2 hover:bg-slate-300 rounded cursor-pointer"
            >
              <Image className="fill-white" src={l.icon} alt={l.name} width={25} height={25} />
              <div className="text-black dark:text-white">{l.name}</div>
            </div>
          ))}
        </div>
      </div> */}
      </div>
    </div>
  );
};

export const themes = [
  {
    name: "light",
    icon: "/dashboard/light.svg",
  },
  {
    name: "dark",
    icon: "/dashboard/dark.svg",
  },
  {
    name: "system",
    icon: "/dashboard/system.svg",
  },
] as const;
