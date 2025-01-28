// import Image from "next/image";
// import Footer from "@/components/Footer";
import LandingHero from "@/components/LandingHero";
import FocusArea from "@/components/FocusArea";
import Portfolio from "@/components/Portfolio";
import Timeline from "@/components/Timeline";
import TeamLanding from "@/components/TeamLanding";
import NewsSection from "@/components/NewsSection";

export default function Home() {
  return (
    <>
    
      <LandingHero />
      <FocusArea />
      <Portfolio />
      <Timeline />
      <TeamLanding />
      <NewsSection />
    
    </>
  );
}
