import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Suspense } from 'react'
import moment from "moment"
import { getAllArticles } from "../lib/database/action/insightsAction";
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
} from "react-icons/pi";
import img_art1 from "../../public/img/insight/art-1.png";
import img_art2 from "../../public/img/insight/art-2.png";
import img_art3 from "../../public/img/insight/art-3.png";

export interface ArticlesSectionProps {
    subtitle?: string;
    showSubtitle?: boolean;
    title?: string;
}

function ArticleCard({
  image,
  title,
  date,
  readTime,
  link
}: {
  image:{secure_url: string};
  title: string;
  date: string;
  readTime:number;
  link: string;
}) {
  return (
   <div className="card bg-base-100 shadow-md w-full border p-2">
  <div className="card-body p-4">
    <div className="w-1/3 mx-auto"></div>
    <Image
      src={image.secure_url}
      width={400} // Increased width
      height={150} // Reduced height
      quality={100}
      alt="Transition VC Articles"
      className="object-fill h-[150px] w-full rounded-lg"
    />
  </div>
  <p className="text-[1.25rem] text-wrap pr-[0.7rem] pl-3">{title}</p>
  <h4 className="text-[#828282] font-thin py-2 pl-3">
    {moment(date).format("YYYY-MM-DD")} - {readTime} min read
  </h4>
  <a href={link} className="text-2xl px-3 text-primary hover:underline mb-3">Read More</a>
</div>

  
  );
}

const articleCards = [
  {
    name: "one",
    image: img_art1,
    title: <>VCs chase auto parts makers to hitch a ride on EV journey</>,
    date: "Jul 01, 2024",
    read_time: "5 min read",
    link: "https://mediabrief.com/transition-vc-and-ieee-partnered-and-hosted-the-marquee-summit/"
  },
  {
    name: "two",
    image: img_art2,
    title: <>Mohammed Shoeb Ali on "Clean Mobility & the Role of Indian Startups"</>,
    date: "Sep 16, 2023",
    read_time: "6 min read",
    link: "https://economictimes.indiatimes.com/tech/funding/low-cost-hydrogen-cell-startup-protonas-bags-funding-in-round-led-by-transition-vc/articleshow/111815713.cms?from=mdr"
  },{
    name: "three",
    image: img_art3,
    title: <>Mohammed Shoeb Ali on "Making India a Green Hydrogen Power”</>,
    date: "Sep 11, 2023",
    read_time: "6 min read",
    link:"https://economictimes.indiatimes.com/tech/startups/vcs-chase-auto-parts-makers-to-hitch-a-ride-on-ev-journey/articleshow/111385994.cms?from=mdr"
  }
];

export default function ArticlesSection({props}: {props: ArticlesSectionProps|undefined}) {
 
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
  
// fetchArticleData()
  const showSubtitle = props?.showSubtitle ?? true;
  const title = props?.title ?? "Articles";
  const subtitle = props?.subtitle ?? "Articles";
  
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
                  <button className="btn btn-circle btn-ghost">
                    <IconCircleArrowLeft className="w-full h-full" />
                  </button>
                  <button className="btn btn-circle btn-ghost">
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
