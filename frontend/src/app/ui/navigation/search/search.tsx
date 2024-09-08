import React, { useState, Fragment } from "react";
import PopOut from "./popup";
import { Pet } from "@/app/utils/interface";

export const Searchbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [items, setItems] = useState<Pet[]>([]);

  const handleClose = () => setOpenMenu((prev) => !prev);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pets`);
      const ctx = await response.json();
      return ctx.data;
    } catch (error) {
      return []
    }
  }
  
  const handleOpen = () => {
    fetchData().then(data => {
      setItems(data);
      setOpenMenu((prev) => !prev);
    });
  }

  return (
    <Fragment>
      <button
        onClick={handleOpen}
        className="p-5 overflow-hidden  h-16 bg-light-secondary shadow-sm flex group items-center"
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
      </button>
      {openMenu && <PopOut items={items} handleClose={handleClose} />}
    </Fragment>
  );
};
