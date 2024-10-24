import { cn } from "@/app/utils/functions";
import { PanelProgressBarProps } from "@/app/utils/interface";
import React from "react";

export default function PanelProgressBar({
  progressItems,
  className,
}: PanelProgressBarProps) {
  return (
    <div className={cn("relative rounded flex", className)}>
      <ul className="flex flex-row w-full px-2 gap-2 py-2">
        {progressItems.map(({ status, completedColor, question }) => {
          return (
            <li key={question} className="flex items-center gap-2 flex-1">
              <span
                className={`p-1 bg-gradient-to-r rounded-xl  ${
                  (status === "completed" &&
                    `${completedColor.from} ${completedColor.to}`) ||
                  (status === "current" && " border-2 bg-lightGray border-darkMaroon") ||
                  (status === "incomplete" && " bg-lightGray")
                } bg-black w-full`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
