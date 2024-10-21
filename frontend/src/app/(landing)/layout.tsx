import Footer from "../ui/navigation/Footer";
import Header from "../ui/navigation/Header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationItems = ["About", "Explore", "Team"];

  return (
    <section className="bg-slate-700">
      <Header navigationItems={navigationItems} />
      {children}
      <Footer />
    </section>
  );
}
