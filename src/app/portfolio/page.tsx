import React from "react";
import AbstractHero from "@/components/AbstractHero";
import NewsSection from "@/components/NewsSection";
import InvestmentHighlightSections from "../../components/InvestmentHighlightSections";
import bg_portfolio from "../../../public/img/bg-portfolio-root.png";

export default function Portf() {
  const content = (
    <div>
      At Transition VC, we support teams developing future technologies focused on{" "}
      <strong>decarbonisation</strong>.
    </div>
  );
  return (
    <>
      <AbstractHero content={content} bg={bg_portfolio.src}/>
      <InvestmentHighlightSections />
      <NewsSection />
    </>
  );
}
