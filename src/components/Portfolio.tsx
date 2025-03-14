"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import sq_matel from "../../public/img/investments/sq_matel.png";
import sq_emo from "../../public/img/investments/sq_emo.png";
import sq_protonas from "../../public/img/investments/sq_protonas.png";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination ,Autoplay} from 'swiper/modules';
interface PortfolioProps {
  data: any[];  // Define the expected prop
}
export default function Portfolio({data}:PortfolioProps) {

  // console.log(" ythe data is the portfolio is", data)
  return (
    <section className="relative border border-[#ADE9E4] min-h-[45vh] py-5 flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow"></div>
      <div className="relative z-10 h-max max-w-screen-2xl sm:py-16 lg:px-6 py-8 px-4 mx-auto grow content-center">
        <div className="grid grid-flow-row grid-cols-1 place-content-center">
          <h3 className="tracking-[.6rem] text-[#5C5C5C] font-medium text-center mb-8">
            Our Portfolio
          </h3>

          <div className="">
            {data &&<Swiper
            
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,

        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper   "
      >
              { data?.map((el,idx)=>{
                return (<SwiperSlide key={idx}>
                  <Link  key={idx}
                   href="/portfolio" 
                   >
                    <div className="flex p-2 justify-center items-center py-8">
     <Image
                      
                      src={el?.image?.secure_url}
                      alt={el?.name}
                      width={180}
                      height={38}
                      priority
                      className="hover:scale-110  p-3 transition-transform duration-300 hover:border-4 hover:border-primary hover:rounded-[3rem]"
                    />
                    </div>
               
                  </Link>
                  </SwiperSlide>)
              })}
         </Swiper>}
          </div>
        </div>
      </div>
      <style jsx>{`
        .bg-radial-glow {
          background-image: radial-gradient(
            ellipse 20% 40% at center,
            rgba(173, 233, 228, 0.5) 0%,
            rgba(173, 233, 228, 0.3) 50%,
            rgba(173, 233, 228, 0.1) 70%,
            transparent 100%
          );
        }
      `}</style>
    </section>
  );
}
