"use client";
import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { getAllNews } from "../lib/database/action/insightsAction"
import moment from "moment"
import {
  IconBuildingFactory2,
  IconCircleArrowDownFilled,
  IconCircleArrowLeft,
  IconCircleArrowRight,
} from "@tabler/icons-react";
import {
  PiCarProfileFill,
  PiLockersFill,
  PiTreeFill,
  PiSolarPanelFill,
  PiWindmillFill,
  PiArrowLeftFill,
  PiArrowRightFill,
} from "react-icons/pi";
import img_news1 from "../../public/img/news-1.png";
import img_news2 from "../../public/img/news-2.png";
import img_news3 from "../../public/img/news-3.png";
import img_news4 from "../../public/img/news-4.png";
import img_news5 from "../../public/img/news-5.png";
import img_news6 from "../../public/img/news-6.png";

export interface NewsSectionProps {
  subtitle?: string;
  showSubtitle?: boolean;
  title?: string;
}

function NewsCard({
  image,
  type,
  title,
  date,
  read_time,
  link,
}: {
  image:{secure_url: string};
  type: string;
  title: string;
  date: string;
  read_time: number;
  link: string;
}) {
  return (
    <div className="card bg-base-100 shadow-md w-full border">
      <div className="card-body p-4">
        {/* <Image src={image.secure_url} width={800} height={400} alt="Transition News" className="w-full h-full object-contain" /> */}
        <Image 
          src={image.secure_url} 
          width={800} 
          height={50} // Reduce height
          alt="Transition News" 
          className="w-full object-center rounded-md"
/>
        <h3 className="tracking-[.2rem] text-[#5C5C5C] font-medium py-2">{type}</h3>
        {/* <div className="size-14 rounded flex items-center justify-center">{icon}</div> */}
        <p className="text-[1.25rem] text-wrap pr-[0.7rem]">{title}</p>
        <h4 className="text-[#828282] font-thin py-2">
          {moment(date).format("YYYY-MM-DD")} - {read_time} min read
        </h4>
        <a href={link} target="_blank" className="text-2xl px-0 text-primary hover:underline">
          Read More
        </a>
      </div>
    </div>
  );
}

const newsCards = [
  {
    name: "news-one",
    image: img_news1,
    type: "NEWS",
    title: <>Transition VC holds hydrogen summit in partnership with IEEE</>,
    date: "Aug 22, 2024",
    read_time: "4 min read",
    link: "https://mediabrief.com/transition-vc-and-ieee-partnered-and-hosted-the-marquee-summit/",
  },
  {
    name: "news-two",
    image: img_news2,
    type: "INVESTMENT",
    title: <>Low-cost hydrogen cell startup Protonas bags funding in round led by Transition VC</>,
    date: "Jul 18, 2024",
    read_time: "6 min read",
    link: "https://economictimes.indiatimes.com/tech/funding/low-cost-hydrogen-cell-startup-protonas-bags-funding-in-round-led-by-transition-vc/articleshow/111815713.cms?from=mdr",
  },
  {
    name: "news-three",
    image: img_news3,
    type: "ARTICLE",
    title: <>VCs chase auto parts makers to hitch a ride on EV journey</>,
    date: "Jul 01, 2024",
    read_time: "5 min read",
    link: "https://economictimes.indiatimes.com/tech/startups/vcs-chase-auto-parts-makers-to-hitch-a-ride-on-ev-journey/articleshow/111385994.cms?from=mdr",
  },
  {
    name: "news-four",
    image: img_news4,
    type: "INVESTMENT",
    title: <>EV components maker Matel raises $4 million in funding</>,
    date: "May 16, 2024",
    read_time: "4 min read",
    link: "https://www.cnbctv18.com/business/startup/pune-based-ev-startup-matel-raises-4-million-in-series-a-to-proprel-expansion-19412852.htm",
  },
  {
    name: "news-five",
    image: img_news5,
    type: "NEWS",
    title: <>Transition VC partners with IEEE to Launch “Net Zero Warriors” Initiative</>,
    date: "July 14, 2023",
    read_time: "4 min read",
    link: "https://www.financialexpress.com/jobs-career/education-transition-vc-partners-with-ieee-to-launch-net-zero-warriors-initiativespan-stylefont-size-11pt-font-family-cabin-sans-serif-background-color-transparent-font-weight-700-font-variant-numeric-normal-fo-3170356/",
  },
  {
    name: "news-six",
    image: img_news6,
    type: "INVESTMENT",
    title: (
      <>
        Former MD Of C&S Electric Ltd., Mr. Anuj Khanna Joined Transition VC As LP & Sector Expert
      </>
    ),
    date: "May 2, 2023",
    read_time: "4 min read",
    link: "https://www.vccircle.com/energytransition-focused-vc-onboards-new-lp-for-maiden-fund",
  },
];

export default function NewsSection(props: NewsSectionProps = {}) {
  const showSubtitle = props?.showSubtitle ?? true;
  const title = props?.title ?? "Featured news and articles";
  const subtitle = props?.subtitle ?? "News";
  const currentCardRef = useRef<HTMLDivElement | null>(null);
    interface News {
    _id: string;
    name: string;
    image: { secure_url: string };
    title: string;
    date: string;
    read_time: number;
    link: string;
    type:string
  }
  const [pressData, setPressData]= useState<News[]>([])
  
  useEffect(()=>{
   const fetchNews =async ()=>{
    try {
      const data = await getAllNews()
      console.log("the data is", data)
      setPressData(data.data);
    } catch (error) {
      console.log(error)
      throw error      
    }
   }
   fetchNews()
  },[])
 
  console.log("the press data is", pressData)
  useEffect(() => {
    // Set the initial ref to the first card
    if (pressData.length > 0) {
      currentCardRef.current = document.getElementById(pressData[0]?._id) as HTMLDivElement;
    }
  }, [pressData]);

  const scrollToCard = (card: HTMLElement) => {
    card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const nextSlide = () => {
    console.log("clicked right")
    if (currentCardRef.current) {
      const nextCard = currentCardRef.current.nextElementSibling as HTMLDivElement;
      if (nextCard) {
        scrollToCard(nextCard);
        currentCardRef.current = nextCard;
      } else {
        // If there's no next card, loop to the first one
        const firstCard = document.getElementById(pressData[0]._id) as HTMLDivElement;
        if (firstCard) {
          scrollToCard(firstCard);
          currentCardRef.current = firstCard;
        }
      }
    }
  };

  const prevSlide = () => {
    console.log("clicked left")
    if (currentCardRef.current) {
      const prevCard = currentCardRef.current.previousElementSibling as HTMLDivElement;
      if (prevCard) {
        scrollToCard(prevCard);
        currentCardRef.current = prevCard;
      } else {
        // If there's no previous card, loop to the last one
        const lastCard = document.getElementById(
          pressData[pressData.length - 1]._id,
        ) as HTMLDivElement;
        if (lastCard) {
          scrollToCard(lastCard);
          currentCardRef.current = lastCard;
        }
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        nextSlide();
      } else if (event.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <>
      <section className="min-h-[45vh] py-5 container mx-auto flex flex-col">
        <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-16 lg:px-6 grow content-center">
          {/* text-accent subtitle, followed by a heading paragraph, followed by a card. all stacked vertically */}
          <div className="grid grid-cols-1">
            <div className="flex">
              <div className="md:w-3/4 md:pr-[20%] mb-8">
                {showSubtitle && (
                  <h3 className="tracking-[.6rem] text-[#5C5C5C] font-medium">{subtitle}</h3>
                )}
                <div className="prose text-xl lg:text-3xl text-wrap">
                  <h3 className="font-normal">{title}</h3>
                </div>
              </div>
              <div className="md:w-1/4 hidden md:flex md:flex-row-reverse ">
                <div className="w-fit mt-8 flex gap-2">
                  <button
                    className="btn btn-circle btn-ghost border border-[#E3E3E3] size-[3rem]"
                    aria-label="Previous"
                    onClick={prevSlide}
                  >
                    <PiArrowLeftFill className="h-[50%] w-full" />
                  </button>
                  <button
                    className="btn btn-circle btn-ghost border border-[#E3E3E3] size-[3rem]"
                    aria-label="Next"
                    onClick={nextSlide}
                  >
                    <PiArrowRightFill className="h-[50%] w-full" />
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="carousel flex flex-nowrap gap-5 w-full"> */}
            <div className="carousel overflow-visible flex flex-nowrap gap-5 w-full  items-start overflow-x-auto scroll-smooth">
              {/* {newsCards.map((item) => (
                <div
                  id={item.name}
                  key={item.name}
                  className="carousel-item w-[90%] md:w-[33.3%] lg:w-[22.2%] py-2 "
                >
                  {NewsCard(item)}
                </div>
              ))} */}
                 {Array.isArray(pressData) && pressData?.map((item) => (
                <div
                  id={item._id}
                  key={item.name}
                  className="carousel-item w-[90%] md:w-[33.3%] lg:w-[22.2%] py-2 "
                >
                  {NewsCard(item)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
