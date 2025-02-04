import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Suspense } from 'react'
import moment from "moment"
import { getAllArticles } from "../lib/database/action/insightsAction";
import {
  IconCircleArrowLeft,
  IconCircleArrowRight,
} from "@tabler/icons-react";

import img_art1 from "../../public/img/insight/art-1.png";
import img_art2 from "../../public/img/insight/art-2.png";
import img_art3 from "../../public/img/insight/art-3.png";

export interface ArticlesSectionProps {
    subtitle?: string;
    showSubtitle?: boolean;
    title?: string;
    articleCards:[any];
}

function ArticleCard(item:{
  icon:any,
  title:string,
  link:string

}) {
  return (
    <div className="card bg-base-100 shadow-md w-full border ">
      <div className="card-body p-4">
        <Image src={item.icon.secure_url} width={400} height={400} alt = {item.title} className="w-full h-full object-contain" />
        <p className="text-[1.25rem] text-wrap pr-[0.7rem]">{item.title}</p>
        <h4 className="text-[#828282] font-thin py-2">{item.title}</h4>
        {item?.link && <a href={item.link} className="text-2xl px-0 text-primary hover:underline">Read More</a>}
        {//replace href with the blog page inside the side
          !item?.link && <a href={"/"} className="text-2xl px-0 text-primary hover:underline">Read More</a>
        }
      </div>
    </div>
  );
}

// const articleCards = [
//   {
//     name: "one",
//     image: img_art1,
//     title: <>VCs chase auto parts makers to hitch a ride on EV journey</>,
//     date: "Jul 01, 2024",
//     read_time: "5 min read",
//     link: "https://mediabrief.com/transition-vc-and-ieee-partnered-and-hosted-the-marquee-summit/"
//   },
//   {
//     name: "two",
//     image: img_art2,
//     title: <>Mohammed Shoeb Ali on "Clean Mobility & the Role of Indian Startups"</>,
//     date: "Sep 16, 2023",
//     read_time: "6 min read",
//     link: "https://economictimes.indiatimes.com/tech/funding/low-cost-hydrogen-cell-startup-protonas-bags-funding-in-round-led-by-transition-vc/articleshow/111815713.cms?from=mdr"
//   },{
//     name: "three",
//     image: img_art3,
//     title: <>Mohammed Shoeb Ali on "Making India a Green Hydrogen Power”</>,
//     date: "Sep 11, 2023",
//     read_time: "6 min read",
//     link:"https://economictimes.indiatimes.com/tech/startups/vcs-chase-auto-parts-makers-to-hitch-a-ride-on-ev-journey/articleshow/111385994.cms?from=mdr"
//   }
// ];

export default function ArticlesSection({props}: {props: ArticlesSectionProps|undefined}) {
  const currentCardRef = useRef<HTMLDivElement | null>(null);
  interface Article {
    _id: string;
    name: string;
    image: { secure_url: string };
    title: string;
    date: string;
    readTime: number;
    link: string;
  }

  const [articleData, setArticleData] = useState<Article[]>([]);

  // useEffect(() => {
  //   const fetchArticles =  async() => {
  //     try {
  //       // const response = await fetch(`http://localhost:8000/api/v1/articles`);
  //       const response = await getAllArticles()
  //       console.log("the response is",response)
  //       if (!response) {
  //         throw new Error('Network response was not ok');
  //       }
  //       // const posts = await response.json();
  //       const posts = response;
  //       console.log("the posts data", posts);
  //       setArticleData(posts);
  //     } catch (error) {
  //       console.error("Failed to fetch articles:", error);
  //     }
  //   };

  //   fetchArticles();
  // }, []);

useEffect(() => {
  const fetchArticles = async () => {
    try {
      const posts = await getAllArticles();  
      console.log("The posts data:", posts);
      setArticleData(posts.data);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };

  fetchArticles();
}, []);
  console.log("the article data is", articleData)
    useEffect(() => {
      // Set the initial ref to the first card
      if (articleData.length > 0) {
        currentCardRef.current = document.getElementById(articleData[0]?._id) as HTMLDivElement;
      }
    }, [articleData]);
  
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
          const firstCard = document.getElementById(articleData[0]._id) as HTMLDivElement;
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
            articleData[articleData.length - 1]._id,
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
  
// fetchArticleData()
  const showSubtitle = props?.showSubtitle ?? true;
  const title = props?.title ?? "Articles";
  const subtitle = props?.subtitle ?? "Articles";
  const articleCards = props?.articleCards??[];
    return (
    <>
    
      <section className="min-h-[45vh] py-5 ">
        <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-16 lg:px-6">
          {/* text-accent subtitle, followed by a heading paragraph, followed by a card. all stacked vertically */}
          <div className="grid grid-cols-1">
            <div className="flex">
              <div className="md:w-3/4 md:pr-[20%] mb-8">
                { showSubtitle && <h3 className="tracking-[.6rem] text-[#5C5C5C] font-medium">{subtitle}</h3>}
                <div className="prose text-xl lg:text-3xl text-wrap">
                  <h3 className="font-medium">{title}</h3>
                </div>
              </div>
              <div className="md:w-1/4 hidden md:flex md:flex-row-reverse ">
                <div className="w-fit mt-8 flex gap-2">
                  <button className="btn btn-circle btn-ghost"
                  onClick={prevSlide}>
                    <IconCircleArrowLeft className="w-full h-full" />
                  </button>
                  <button className="btn btn-circle btn-ghost"
                  onClick={nextSlide}>
                    <IconCircleArrowRight className="w-full h-full" />
                  </button>
                </div>
              </div>
            </div>
            <div className="carousel flex flex-nowrap gap-5 w-full">
               {Array.isArray(articleData) && articleData?.map((item) => (
                <div
                  id={item._id}
                  key={item.name}
                  className="carousel-item lg:w-[33.3%] py-2 "
                >
                    {ArticleCard(item)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
}
