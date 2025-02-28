import React, { useEffect, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import {
  IconCircleArrowLeft,
  IconCircleArrowRight,
} from "@tabler/icons-react"; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

export interface ArticlesSectionProps {
    subtitle?: string;
    showSubtitle?: boolean;
    title?: string;
    articleCards:[any];
}

function ArticleCard(item:{
  _id:any,
  icon:any,
  title:string,
  link:string,
  dateMetaData: string

}) {
  return (
    <div className="card bg-base-100 shadow-md w-full border">
      <div className="card-body p-4">
        <Image src={item?.icon?.secure_url} width={400} height={400} alt = {item?.title} className="w-[350px] h-[160px] object-cover rounded-md" />
        <p className="text-[1.25rem] text-wrap line-clamp-2 pr-[0.7rem]">{item?.title}</p>
        <h4 className="text-[#828282] font-thin py-2">{item?.dateMetaData}</h4>
        {item?.link && <a href={item?.link} target="_blank" className="text-2xl px-0 text-primary hover:underline">Read More</a>}
      </div>
    </div>
  );
}

export default function ArticlesSection({props}: {props: ArticlesSectionProps|undefined}) {
  const showSubtitle = props?.showSubtitle ?? true;
  const title = props?.title ?? "Articles";
  const subtitle = props?.subtitle ?? "Articles";
  const articleCards = props?.articleCards??[];
   const swiperRef:any = useRef(null);
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
                  onClick={nextSlide}
                  >
                    <IconCircleArrowRight className="w-full h-full" />
                  </button>
                </div>
              </div>
            </div>
      
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 },
          }}
          // modules={[Pagination]}
          className="mySwiper w-full"
        ><div className="carousel flex flex-nowrap gap-5 w-full">

            {articleCards?.map((item) => (
            <SwiperSlide key={item?._id} className="carousel-item lg:w-[33.3%] py-8">
              <ArticleCard {...item} />  
            </SwiperSlide>
            ))}
            </div>
          </Swiper>
      
          </div>
        </div>
      </section>
      
    </>
  );
}
  {/* <Swiper
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
              {articleCards?.map((item) => (
                <SwiperSlide key={item?._id}>
                  {ArticleCard(item)}
                </SwiperSlide>
              ))}
            </Swiper>; */}

            {/**   {articleCards?.map((item) => (
                <div
                  id={item?._id}
                  key={item?._id}
                  className="carousel-item lg:w-[33.3%] py-2 "
                >
                  {ArticleCard(item)}
                </div>
              ))} */}