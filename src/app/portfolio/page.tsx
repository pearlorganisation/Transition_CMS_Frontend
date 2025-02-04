"use client"
import React, { useEffect, useState } from "react";
import AbstractHero from "@/components/AbstractHero";
import NewsSection from "@/components/NewsSection";
import InvestmentHighlightSections from "../../components/InvestmentHighlightSections";
import bg_portfolio from "../../../public/img/bg-portfolio-root.png";
import { backendBaseUrl } from "@/components/utils/backendUrl";

export default function Portf() {
  const content = `<div>At Transition VC, we support teams developing future technologies focused on <strong>decarbonisation</strong>.</div>`;

  const [portfolioData, setPortfolioData] = useState([])
  
  useEffect(()=>{
   const fetchData = async()=>{
    try {
      const data = await fetch(`${backendBaseUrl}/portfolio`)
      const res = await data.json()
      console.log("the res is", res)
      setPortfolioData(res.data);
    } catch (error) {
      console.log("the error is", error)
      throw error
    }
   }
   fetchData()
  },[])

  console.log("the portfolio data is", portfolioData)
  return (
    <>
      <AbstractHero content={content} bg={bg_portfolio.src}/>
      <InvestmentHighlightSections data={portfolioData} />
      <NewsSection />
    </>
  );
}
