import Image from "next/image";
import React from "react";
import Github from "./components/Github";
import Linkedin from "./components/Linkedin";

interface Member {
  name: string;
  role: string;
  photo: string;
  linkedinUrl: string;
  githubUrl?: string;
}

const members: Member[] = [
  {
    name: "Bradley Hung",
    role: "Project Manager",
    photo: "/teams/bradley.jpeg",
    githubUrl: "https://www.github.com/bradleyhung",
    linkedinUrl: "https://www.linkedin.com/in/bradley-hung/",
  },
  {
    name: "Bi Rong Liu",
    role: "Frontend Developer",
    photo: "/teams/birong.png",
    githubUrl: "https://www.github.com/birongliu",
    linkedinUrl: "https://www.linkedin.com/in/birongliu/",
  },
  {
    name: "Shuyi Zhou",
    role: "Backend Developer",
    photo: "/teams/shuyi.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/shuyi-zhou-296ab6246/",
  },
  {
    name: "Jessica Jiang",
    role: "UI/UX Designer",
    photo: "/teams/jessica.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/jjessica415/",
  },
];
/**flex items-center px-12 justify-center dark:bg-slate-800 bg-lightBeige */

export default function Team() {
  return (
    <section
      id="Team"
      className="flex-col py-40 md:px-20 px-10 rounded justify-center w-full flex items-center"
    >
      <div className="max-w-7xl w-full flex flex-col text-center gap-3">
        <span className="font-bold font-poppins dark:text-white text-darkMaroon text-4xl">
          Meet the Team
        </span>
        <p className="dark:text-white text-darkMaroon font-poppins text-lg leading-6">
          We&apos;re a dynamic group of individuals who are passionate about what we
          do.
        </p>
      </div>
      <ul className="pt-16 grid lg:grid-cols-2 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-20 ">
        {members.map((member, index) => {
          return (
            <div
              className="flex text-center flex-col gap-4 w-full "
              key={index}
            >
              <Image
                src={member.photo}
                alt={member.name}
                width={200}
                height={200}
                className="w-52 h-52 rounded-full"
              />
              <div className="flex gap-1 flex-col">
                <span className="font-poppins dark:text-white text-darkMaroon text-xl font-semibold text-primary">
                  {member.name}
                </span>
                <span className="font-poppins text-base dark:text-gray-300 text-gray-500">
                  {member.role}
                </span>
                <ul className="flex justify-center gap-2 pt-1">
                  <li>
                    {member.githubUrl && <Github link={member.githubUrl} />}
                  </li>
                  <li>
                    {member.linkedinUrl && <Linkedin link={member.linkedinUrl} />}
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </ul>
    </section>
  );
}
