"use client";
import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { getAllNews } from "../lib/database/action/insightsAction"
import Link from "next/link";
import moment from "moment"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
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
  newsCards:any;
}

function NewsCard(item:any) {
  return (
  // <div className="card bg-base-100 shadow-md w-full border">
  //   <div className="card-body p-4">
  //     <Image src={item?.icon?.secure_url} height={200} width={200}   alt="Transition News" className="w-full h-full object-contain" />
  //     <h3 className="tracking-[.2rem] text-[#5C5C5C] font-medium py-2">{item?.shortTitle ?? item.blogType}</h3>
      
  //     <p className="text-[1.25rem] text-wrap pr-[0.7rem]">{item?.title}</p>
  //     <h4 className="text-[#828282] font-thin py-2">
  //       {item?.dateMetaData}
  //     </h4>
  //     {item?.link &&<a href={item?.link} target='_blank' className="text-2xl px-0 text-primary hover:underline">
  //       Read More
  //     </a>}

  //     {
  //       !item?.link && <Link href={`/insight/${item?._id}`} className="text-2xl px-0 text-primary hover:underline">
  //       Read More
  //     </Link>}
      
  //   </div>
  // </div>
  <div className="card bg-base-100 shadow-md w-full border">
      <div className="card-body p-4">
        <Image src={item?.icon?.secure_url} height={100} width={200}   alt="Transition News" className="w-full h-[160px] rounded-md object-cover" />
        <h3 className="tracking-[.2rem] text-[#5C5C5C] font-medium py-2">{item?.shortTitle}</h3>
        {/* <div className="size-14 rounded flex items-center justify-center">{icon}</div> */}
        <p className="text-[1.25rem] text-wrap pr-[0.7rem]">{item.title}</p>
        <h4 className="text-[#828282] font-thin py-2">
          {item.dateMetaData}
        </h4>
        {item?.link &&<a href={item.link} target="_blank" className="text-2xl px-0 text-primary hover:underline">
          Read More
        </a>}
{/* 
        { 
          !item?.link && <a href={"/"} target="_blank" className="text-2xl px-0 text-primary hover:underline">
          Read More
        </a>} */}
        
      </div>
    </div>
  );
}
export default function NewsSection(props: NewsSectionProps) {
  console.log("news and press is",props.newsCards)
  const showSubtitle = props?.showSubtitle ?? true;
  const title = props?.title ?? "Featured news and articles";
  const subtitle = props?.subtitle ?? "News";
  const newsCards = props?.newsCards || [];
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
 
  const swiperRef = useRef(null);
    const nextSlide = () => {
      if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
    };
    const prevSlide = () => {
       if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
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
                <Swiper
                              ref={swiperRef}
                              slidesPerView={1}
                              spaceBetween={10}
                              pagination={{ clickable: true }}
                              breakpoints={{
                                640: { slidesPerView: 2, spaceBetween: 20 },
                                768: { slidesPerView: 3, spaceBetween: 30 },
                                1024: { slidesPerView: 4, spaceBetween: 40 },
                              }}
                              modules={[Pagination]}
                              className="mySwiper w-full"
                            >
                                {newsCards.map((item:any) => (
                                <SwiperSlide key={item?._id}> 
                                  <div
                                  id={item?._id}
                                  key={item?._id}
                                  className="carousel-item py-2 "
                                >
                                  {NewsCard(item)}
                                </div></SwiperSlide>
                                
                              ))}
                          </Swiper>
              {/* {newsCards.map((item:any) => (
                <div
                  id={item?._id}
                  key={item?._id}
                  className="carousel-item py-2 "
                >
                  {NewsCard(item)}
                </div>
              ))} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
