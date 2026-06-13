import MainLayout from "../layouts/MainLayout";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Menu from "../components/Menu";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import WhatsAppButton from "../components/WhatsAppButton";

function Home() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Services />
      <Menu />
      <Gallery />
      <Contact />
      <WhatsAppButton />
    </MainLayout>
  );
}

export default Home;