'use client';
import React, { useState, Fragment } from "react";
import PopOut from "./popup";

export function Searchbar<T>({ data, filter, render }: { data: T[], render: (item: T, index: number) => React.ReactNode, filter: (search: string, item: T) => boolean }) {
  const [openMenu, setOpenMenu] = useState(false);

  const handleClose = () => setOpenMenu((prev) => !prev);

  const handleOpen = () => {
    setOpenMenu((prev) => !prev);
  };
  return (
    <Fragment>
      <button
        onClick={handleOpen}
        className="p-5 bg-light-ivory border-2 w-full  rounded-xl overflow-hidden h-16 bg-light-secondary shadow-sm flex group items-center"
      >
        <div className="flex items-center justify-center dark:fill-white fill-dark">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Isolation_Mode"
            data-name="Isolation Mode"
            viewBox="0 0 24 24"
            width="22"
            height="22"
          >
            <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
          </svg>
        </div>
        <span className="pl-2">Search for pets</span>
      </button>
      {openMenu && <PopOut filter={filter} render={render} items={data} handleClose={handleClose} />}
    </Fragment>
  );
}; 
