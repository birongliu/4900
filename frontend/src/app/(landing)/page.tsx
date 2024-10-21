import Hero from "../ui/landing/Hero";
import About from "../ui/landing/About";
import Explore from "../ui/landing/Explore";
import Team from "../ui/landing/Team";

export default function Home() {
  return (
    <main className="relative flex justify-center items-center flex-col w-full overflow-hidden">
      <Hero />
      <About />
      <Explore />
      <Team />
    </main>
  );
}