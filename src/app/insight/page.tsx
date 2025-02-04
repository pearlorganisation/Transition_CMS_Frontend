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
import "dotenv/config" 
import { backendBaseUrl } from "@/components/utils/backendUrl";


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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [insightsData,setInsightData] =  useState<any>(null);;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/blogs`);
        const response = await fetch(`${backendBaseUrl}/blogs`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        const map = new Map();
        result?.data?.forEach((element:any) => {
          if(!map?.has(element?.blogType))
          {
            map.set(`${element.blogType}`,[{...element}])
          }
          else{
            const currentArray = map?.get(element?.blogType);
            currentArray.push(element);
          }
        });
        setInsightData(map);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const content =`<div>
      News, announcements, insights, and trends on climate.
    </div>`





  return (
    <>
      <AbstractHero content={content} bg={bg_impact.src} />
      <TabList
        tabs={Object.keys(sectionRefs)}
        activeTab={activeTab}
        onTabClick={scrollToSection as any}
        navbarHeight={navbarHeight}
      />
{insightsData &&<>
{/* Mission Section */}
     <div
        id="Articles"
        ref={sectionRefs.Articles}
        className="container mx-auto px-4 py-8 pt-16 min-h-[45vh] grid  content-center"
      >
        <ArticlesSection props={{showSubtitle: false,articleCards:insightsData?.get('ARTICLES')} as ArticlesSectionProps}  />
      </div>
      {/* Press Section */}
      <div
        id="Press"
        ref={sectionRefs.Press}
        className="container mx-auto px-4 py-8 pt-16 min-h-[45vh] grid  content-center"
      >
        <NewsSection newsCards={insightsData?.get('PRESS')} showSubtitle={false}  title= "Press" />
      </div>
      {/* ESG Section  */}
      <div
        id="Podcast"
        ref={sectionRefs.Podcast}
        className="container mx-auto px-4 py-8 pt-16 min-h-[45vh] grid  content-center"
      >
        <PodcastListing data = {insightsData?.get('PODCAST')}/>
      </div>

</>   }   
      {/* Newsletter Section */}
      <div ref={sectionRefs.Newsletter} id="Newsletter" className="mt-16"><NewsletterSubscription  /></div>
    </>
  );
}
