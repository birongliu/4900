"use client";
import React from "react";

export default function Popup({ isOpen, setIsOpen, children }: { isOpen: boolean; setIsOpen: (open: boolean) => void, children: React.ReactNode }) {
  return (
    <div>
      {isOpen && (
        <div
          role="dialog"
          className="fixed  flex py-32 items-center flex-col inset-0 z-50 backdrop-blur-md ease-in animate-fadeIn"
        >
          <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              aria-label="Close popup"
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
