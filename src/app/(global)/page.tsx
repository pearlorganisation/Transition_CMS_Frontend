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
import { useEffect } from "react";

export default function Home() {
   const { newsData, loading, error } = useNews();
   const newsAndArticlData =[]
  //  useEffect(()=>{
  //       newsAndArticlData
  //  },[newsData])
  return (
    <>
    
      <LandingHero />
      <FocusArea />
      <Portfolio />
      <Timeline />
      <TeamLanding />
{
newsData&&      <NewsSection newsCards={[...newsData.get("PRESS"),...newsData.get("ARTICLES")]} showSubtitle={false} title="Press" />
}    
    </>
  );
}
