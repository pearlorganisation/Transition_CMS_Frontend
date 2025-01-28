import React from "react";
import TeamHero from "@/components/Team/TeamHero";
import TeamGallery from "@/components/Team/TeamGallery";
import InvestorPage from "../investors/page";

export default function Home() {
  return (
    <>
      <TeamHero />
      <InvestorPage />
      <TeamGallery />
    </>
  );
}
