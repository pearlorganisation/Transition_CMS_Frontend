"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AbstractHero from "@/components/AbstractHero";
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

const PolicyItem = (data:any) => {
  console.log(data);
  return <div className="flex items-start space-x-4 mb-8">
  <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-lg flex-shrink-0">
    <Image src={data?.icon?.secure_url} alt={data.title} className="max-w-full max-h-full" width={120} height={120} />
  </div>
  <div>
    <h3 className="text-xl font-semibold mb-2">{data.title}</h3>
    <p className="text-gray-600">{data?.shortDescription}</p>
  </div>
</div>
};

const SDGIcon = ({ number, color, imagePath }: { number: number; color: string; imagePath: string }) => (
  <div className={`w-24 h-24 ${color} flex items-center justify-center`}>
    <Image src={imagePath} alt={`SDG ${number}`} className="w-24 h-24" width={240} height={240} quality={100} unoptimized />
  </div>
);

export default function Impacts() {
  const sectionRefs = {
    Mission: useRef<HTMLDivElement>(null),
    SDGs: useRef<HTMLDivElement>(null),
    ESGs: useRef<HTMLDivElement>(null),
    Policies: useRef<HTMLDivElement>(null),
  };
  const [activeTab, setActiveTab] = useState("Mission");
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [impactData,setImpactData] =  useState<any>(null);;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/impact`);

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        const map = new Map();
        result?.data?.forEach((element:any) => {
          if(!map?.has(element?.impactDataType))
          {
            if(element?.impactDataType == "POLICIES")
            {
              map.set(`${element.impactDataType}`,[{...element}])

            }
            else
              map.set(element.impactDataType,element);
          }
          else{
           if(element?.impactDataType == "POLICIES")
            {
              const currentArray = map?.get(element?.impactDataType);
              currentArray.push(element);
            }
            

          }
        });
        setImpactData(map);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);  

  useEffect(() => {
    const navbar = document.querySelector(".navbar") as HTMLElement;
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
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const content = (
    <div>
      From Carbon Reduction to Social Empowerment:
      <br />
      <strong>Our Holistic Impact Vision</strong>
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
      <TabList tabs={Object.keys(sectionRefs)} activeTab={activeTab} onTabClick={scrollToSection as any} navbarHeight={navbarHeight} />
      {/* Mission Section */}
      <div id="Mission" ref={sectionRefs.Mission} className="container mx-auto px-4 py-8 pt-16 min-h-[45vh] grid  content-center">
        <h1 className="text-4xl font-bold mb-6">Mission</h1>
        <div className="relative bg-[#f2fbfb] p-6 rounded-lg min-h-[10rem] flex items-center">
          <div
            className="absolute inset-0 overflow-hidden rounded-lg opacity-40"
            style={{
              backgroundImage: `
            linear-gradient(to right, #96e0da 1px, transparent 1px),
            linear-gradient(to bottom, #96e0da 1px, transparent 1px)
          `,
              backgroundSize: "56px 56px",
            }}
          ></div>
          <p className="relative text-lg text-gray-800 leading-relaxed z-10">
            {/* At Transition VC, we are committed to{" "}
            <strong>offsetting 40 million tons of CO2—equivalent to nearly 1% of India's annual total carbon emissions</strong>. This bold mission
            underscores our unwavering commitment to driving a cleaner, more sustainable future, ensuring a lasting positive impact for generations
            ahead. */}
            {impactData &&  <div dangerouslySetInnerHTML={{__html:impactData.get("MISSION")?.title}}></div>}
          </p>
        </div>
      </div>
      {/* SDGs Section */}
      <div id="SDGs" ref={sectionRefs.SDGs} className="container mx-auto px-4 py-8 pt-16 min-h-[45vh] grid  content-center">
         <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">SDGs</h1>
          <Image src={sdg_logo} alt="Sustainable Development Goals" className="h-16 w-16" />
        </div>
        {/* <p className="mb-8 text-gray-700">
          Transition VC is dedicated to advancing crucial Sustainable Development Goals (SDGs),
          <br /> fostering impactful solutions that contribute to a more sustainable and inclusive world.
        </p> */}
      {impactData &&  <div dangerouslySetInnerHTML={{__html:impactData.get("SDGS")?.title}}>

        </div>}
      </div>
      {/* ESG Section  */}
      <div id="ESGs" ref={sectionRefs.ESGs} className="container mx-auto px-4 py-8 pt-16 min-h-[45vh] grid  content-center">
        <h1 className="text-4xl font-bold mb-8">ESGs</h1>
        {impactData &&  <div dangerouslySetInnerHTML={{__html:impactData.get("ESGS")?.title}}>

</div>}
      </div>
      <div id="Policies" ref={sectionRefs.Policies} className="container mx-auto px-4 py-16 min-h-[45vh] grid content-center">
      <h1 className="text-4xl font-bold mb-8">Policies</h1>
      <div className="space-y-8">
    {impactData?.get("POLICIES")?.map((item: any) => (
      <React.Fragment key={item?._id}>
        <PolicyItem {...item} />
        <hr className="border-t border-gray-200" />
      </React.Fragment>
    ))}
  </div>
</div>
    </>
  );
}
