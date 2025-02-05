"use client"
// import Image from "next/image";
// import Footer from "@/components/Footer";
import { useNews } from "@/context/NewsContext";
import LandingHero from "@/components/LandingHero";
import FocusArea from "@/components/FocusArea";
import Portfolio from "@/components/Portfolio";
import Timeline from "@/components/Timeline";
import TeamLanding from "@/components/TeamLanding";
import NewsSection from "@/components/NewsSection";

export default function Home() {
   const { newsData, loading, error } = useNews();
  return (
    <>
    
      <LandingHero />
      <FocusArea />
      <Portfolio />
      <Timeline />
      <TeamLanding />
      <NewsSection newsCards={newsData?.get("PRESS")} showSubtitle={false} title="Press" />
    
    </>
  );
}
