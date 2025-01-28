"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AbstractHero from "@/components/AbstractHero";
import NewsSection, { NewsSectionProps } from "@/components/NewsSection";
import ArticlesSection, { ArticlesSectionProps } from "../../components/ArticlesSection";
import PodcastListing from "../../components/PodcastSection";
import NewsletterSubscription from "../../components/NewsletterSubscription";
import TabList from "@/components/TabList"; 
import bg_impact from "../../../public/img/bg-impact.png";
import rec_iic from "../../../public/img/impact/rec_iic.png";
import rec_pri from "../../../public/img/impact/rec_pri.png";
import sdg13 from "../../../public/img/impact/sdg-13.png";
import sdg7 from "../../../public/img/impact/sdg-07.png";
import sdg8 from "../../../public/img/impact/sdg-08.png";
import sdg11 from "../../../public/img/impact/sdg-11.png";
import sdg17 from "../../../public/img/impact/sdg-17.png";
import sdg12 from "../../../public/img/impact/sdg-12.png";
import sdg6 from "../../../public/img/impact/sdg-06.png";
import sdg10 from "../../../public/img/impact/sdg-10.png";
import sdg9 from "../../../public/img/impact/sdg-09.png";
import sdg_logo from "../../../public/img/impact/goals.png";

const PolicyItem = ({ logo, title, description }: { logo: string; title: string; description: string }) => (
  <div className="flex items-start space-x-4 mb-8">
    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-lg flex-shrink-0">
      <Image src={logo} alt={title} className="max-w-full max-h-full" />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const SDGIcon = ({ number, color, imagePath }: { number: number; color: string; imagePath: string }) => (
  <div className={`w-24 h-24 ${color} flex items-center justify-center`}>
    <Image src={imagePath} alt={`SDG ${number}`} className="w-20 h-20" />
  </div>
);

export default function Insights() {
  const [activeTab, setActiveTab] = useState("Articles");
  const [navbarHeight, setNavbarHeight] = useState(0);
  const sectionRefs = {
    Articles: useRef<HTMLDivElement>(null),
    Press: useRef<HTMLDivElement>(null),
    Podcast: useRef<HTMLDivElement>(null),
    Newsletter: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: `-${navbarHeight}px 0px 0px 0px`,
      threshold: 0.5,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [navbarHeight]);

  const scrollToSection = (sectionId: keyof typeof sectionRefs) => {
    const yOffset = -navbarHeight - 50; // 50px for the tablist height
    const element = sectionRefs[sectionId].current;
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  const content = (
    <div>
      News, announcements, insights, and trends on climate.
    </div>
  );

  const esgData = [
    {
      letter: "E",
      title: "nvironmental Impact",
      content:
        "With the momentum of our current portfolio and future projections, we anticipate enabling a CO2 offset of approximately 40 million tons, marking a significant stride toward a greener, more sustainable planet.",
    },
    {
      letter: "S",
      title: "ocial Impact",
      content:
        "Our commitment to empowering the workforce is evident in the ~200 blue-collar jobs created through our existing portfolio. Looking ahead, we project this number to soar, generating over 3,000 direct jobs and 10,000 indirect opportunities across our future investments. Additionally, 10% of our portfolio companies proudly feature women in leadership roles, championing diversity and inclusion at the highest levels.",
    },
    {
      letter: "G",
      title: "overnance Initiatives",
      content:
        "We provide support to our portfolio companies, tailored to their unique stage of development. By taking active board roles and engaging regularly with our startups, we ensure the integration of robust ESG practices and principles, fostering a culture of responsible governance across all operations.",
    },
  ];

  const policies = [
    {
      logo: rec_pri.src,
      title: "Transition VC Joins the Ranks of UNPRI Signatories!",
      description:
        "We're excited to announce that Transition VC is now a proud member of UNPRI, reinforcing our commitment to integrating sustainability and ethical practices into everything we do.",
    },
    {
      logo: rec_iic.src,
      title: "Transition VC Joins the IIC Community!",
      description:
        "We're thrilled to share that Transition VC is now a member of the Indian Impact Investors Council (IIC), strengthening our dedication to driving positive social and environmental change through impactful investments.",
    },
  ];

  const sdgs = [
    { number: 13, color: "bg-[#3F7E44]", imagePath: sdg13.src },
    { number: 7, color: "bg-[#FCC30B]", imagePath: sdg7.src },
    { number: 8, color: "bg-[#A21942]", imagePath: sdg8.src },
    { number: 11, color: "bg-[#FD6925]", imagePath: sdg11.src },
    { number: 17, color: "bg-[#19486A]", imagePath: sdg17.src },
    { number: 12, color: "bg-[#BF8B2E]", imagePath: sdg12.src },
    { number: 6, color: "bg-[#26BDE2]", imagePath: sdg6.src },
    { number: 10, color: "bg-[#DD1367]", imagePath: sdg10.src },
    { number: 9, color: "bg-[#FD6925]", imagePath: sdg9.src },
  ];

  return (
    <>
      <AbstractHero content={content} bg={bg_impact.src} />
      <TabList
        tabs={Object.keys(sectionRefs)}
        activeTab={activeTab}
        onTabClick={scrollToSection as any}
        navbarHeight={navbarHeight}
      />
      {/* Mission Section */}
      <div
        id="Articles"
        ref={sectionRefs.Articles}
        className="container mx-auto px-4 py-8 pt-16 min-h-[45vh] grid  content-center"
      >
        <ArticlesSection props={{showSubtitle: false} as ArticlesSectionProps} />
      </div>
      {/* Press Section */}
      <div
        id="Press"
        ref={sectionRefs.Press}
        className="container mx-auto px-4 py-8 pt-16 min-h-[45vh] grid  content-center"
      >
        <NewsSection showSubtitle={false}  title= "Press" />
      </div>
      {/* ESG Section  */}
      <div
        id="Podcast"
        ref={sectionRefs.Podcast}
        className="container mx-auto px-4 py-8 pt-16 min-h-[45vh] grid  content-center"
      >
        <PodcastListing/>
      </div>
      {/* Newsletter Section */}
      <div ref={sectionRefs.Newsletter} id="Newsletter" className="mt-16"><NewsletterSubscription  /></div>
    </>
  );
}
