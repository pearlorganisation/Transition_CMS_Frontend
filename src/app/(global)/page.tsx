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
import { useEffect, useState } from "react";
import { backendBaseUrl } from "@/components/utils/backendUrl";
import Loader from "@/components/Loader";

export default function Home() {
   const { newsData, loading, error } = useNews();
   const newsAndArticlData =[]
  //  useEffect(()=>{
  //       newsAndArticlData
  //  },[newsData])
   const [portfolioData, setPortfolioData] = useState<any[] | null>(null)
     const [isloading, setIsLoading] = useState<boolean>(false);
    useEffect(()=>{
      const fetchData = async()=>{
       try {
         setIsLoading(true);
         const data = await fetch(`${backendBaseUrl}/portfolio`,{
          cache:"no-store"
         })
         const res = await data.json()
         console.log("the res is", res)
         setPortfolioData(res.data);
       } catch (error) {
         console.log("the error is", error)
         throw error
       }
      }
      fetchData()
       setIsLoading(false);
     },[])
  return (
    <>
    
      <LandingHero />
      <FocusArea />

       {isloading ? <Loader /> : portfolioData && <Portfolio data={portfolioData}  />} 
       {isloading ? <Loader />: portfolioData && <Timeline data={portfolioData} />} 
      <TeamLanding />
{
  
newsData&&      <NewsSection newsCards={[...newsData.get("PRESS")]} showSubtitle={false} title="Press" />
}{/** will add in future newsSection ,...newsData.get("ARTICLES") */}    
    </>
  );
}
