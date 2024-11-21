import Image from "next/image";
import React from "react";

const cards = [
  {
    title: "Adopt",
    description: "Find your perfect furry friend through our adoption program. Give a pet a forever home and experience the unconditional love they bring",
    image: "/about/chat.svg",
  },
  {
    title: "Community",
    description: "Become a part of our vibrant community. Connect with fellow pet lovers, share experiences, and support each other.",
    image: "/about/chat.svg",
  },
  {
    title: "AI",
    description: "Explore our AI-driven tools designed to enhance your pet care experience. Get personalized recommendations and insights.",
    image: "/about/chat.svg",
  },
];

export default function About() {
  return (
    <section
      id="About"
      className="flex  items-center rounded-xl md:px-24 border-2 px-16 py-20 mt-28 justify-center bg-light-peach"
    >
      <div className="max-w-7xl w-full flex flex-col items-center ">
        <h1 className="text-4xl md:text-5xl font-bold font-poppins dark:text-white  text-primary leading-tight">
          What is Petpals?
        </h1>
        <p className="text-darkMaroon text-lg font-poppins dark:text-white  pt-10 text-wrap ">
          PetPals aims to be the leading platform that transforms the pet
          adoption experience by seamlessly integrating a social network for pet
          enthusiasts. Our vision is to create a community where pet lovers can
          connect, share experiences, and find their perfect pet companions. Our
          mission is to create a vibrant community where pet enthusiasts can
          discover and adopt their perfect companions while fostering meaningful
          connections with other pet owners. Whether you&apos;re looking to adopt a
          pet, seek advice, or simply share your love for animals, PetPals
          provides a comprehensive and engaging platform to meet all your needs.
          Join us in making pet adoption a joyful and connected experience for
          everyone.
        </p>
        <div className="pt-16 grid items-center lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-20">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex bg-black  rounded-xl flex-col p-8 bg-gradient-to-b from-lightBeige to-darkMaroon gap-3 justify-center  w-72 h-96"
            >
              <Image
                alt={card.title}
                src={card.image}
                width={100}
                height={100}
              />
              <h1 className="font-bold font-poppins text-2xl text-lightBeige">
                {card.title}
              </h1>
              <p className="text-light-rose text-clip font-poppins">{card.description}</p>
              <a
                href="/"
                className="text-lightBeige font-poppins bg-inherit w-32 hover:underline rounded-xl py-2 px-0"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
