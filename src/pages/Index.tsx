import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Impact from "@/components/Impact";
import Team from "@/components/Team";
import Donations from "@/components/Donations";
import MembershipForm from "@/components/MembershipForm";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Impact />
        <Team />
        <Donations />
        <MembershipForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
