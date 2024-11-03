import React from "react";

export default function PopOut<T>({
  items,
  handleClose,
  filter,
  render,
}: {
  items: T[];
  render: (item: T, index: number) => React.ReactNode,
  filter: ((search: string, items: T) => boolean);
  handleClose: () => void;
}) {
  const [search, setSearch] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState<T[]>(items);
  console.log(items);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search === "") {
      setFilteredItems(items);
      return;
    }
    const filtered = items.filter((item) => filter(search, item));
    setFilteredItems(filtered);
  };
  
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  return (
    <div
      role="dialog"
      onClick={handleClick}
      className="fixed  flex py-32 items-center flex-col inset-0 z-50 backdrop-blur-md ease-in animate-fadeIn"
    >
      <form id="popup" onSubmit={handleSubmit} className="w-96 shadow-md md:w-6/12">
        <input
          type="text"
          form="popup"
          autoFocus={true}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="relative h-12 rounded-md px-3 w-full outline-none border-2 bg-white text-black "
          placeholder="Search for pets or inquries"
        />
      </form>
      <ul
        className={`w-96 md:w-6/12 mt-1 bg-light-rose shadow-md overflow-auto px-2 rounded-md scroll-my-40 py-2 h-52 dark:text-black border-2`}
      >
        <div
          className={`px-2 py-2 text-sm font-bold  border-b-2 ${
            filteredItems.length > 0 ? "block" : "hidden"
          }`}
        >
          Suggestion
        </div>
        {filteredItems.length > 0 ? filteredItems.map((render)) 
        : (
          <div
            className={`flex items-center font-semibold mt-1 h-40 justify-center`}
          >
            {filteredItems.length > 0
              ? "No suggestions"
              : "No suggestions found"}
          </div>
        )}
      </ul>
    </div>
  );
}
