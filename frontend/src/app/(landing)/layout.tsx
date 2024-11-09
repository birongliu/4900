import Footer from "../ui/navigation/Footer";
import Header from "../ui/navigation/Header";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigationItems = ["About", "Explore", "Team"];

  return (
    <section className="bg-light-ivory">
      <Header navigationItems={navigationItems} />
      {children}
      <Footer />
    </section>
  );
}
