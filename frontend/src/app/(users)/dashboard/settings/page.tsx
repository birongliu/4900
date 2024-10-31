import React from "react";
import { ViewProfile } from "../../View";

export default function page() {
  return (
    <div className="w-full ml-64 px-5 py-10 dark:bg-darkMaroon">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">Settings</h1>
          <p className="text-gray-400 dark:text-white">Update your account settings</p>
        </div>
      </div>
      <ViewProfile />
    </div>
  );
}
