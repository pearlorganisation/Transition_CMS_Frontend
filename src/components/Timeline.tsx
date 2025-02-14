"use client";
import React, { ReactElement, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { PiTargetFill, PiMapPinSimpleAreaFill, PiBuildingOfficeFill } from "react-icons/pi";
import t_matel from "@/img/investments/timeline_matel.png";
import t_emo from "@/img/investments/timeline_emo.png";
import t_protonas from "@/img/investments/timeline_patronas.png";
import classes from "./Timeline.module.css";
import { backendBaseUrl } from "./utils/backendUrl";
import parse from "html-react-parser"
function TimelineCard(
  {
    number,
    title,
    body,
    image,
    value,
    stats,
  }: {
    number: number;
    title: string;
    body: string;
    image: StaticImageData;
    value: string;
    stats: [any];
  },
  {
    setValue,
    handleOptionChange,
  }: { setValue: React.Dispatch<React.SetStateAction<string>>; handleOptionChange: any },
) {
  return (
    <div className="timeline-end mb-4">
      {value === number.toString() ? (
        <></>
      ) : (
        <button
          onClick={() => setValue(number.toString())}
          className="btn btn-outline btn-primary w-full ml-4 md:p-8"
        >
          <div className="flex gap-2 w-full h-full items-center content-center text-[1.5rem]/[1.45rem] hover:text-white text-[#666666]">
            <div className="flex items-center justify-center rounded-full size-[1.875rem] bg-[#F5F5F5] text-[#666666]">
              {number}
            </div>
            <p className=" font-mono font-medium ">{title}</p>
          </div>
        </button>
      )}
      <div className="collapse">
        {value !== number.toString() ? (
          <></>
        ) : (
          <>
            <input
              type="radio"
              value={number.toString()}
              onChange={handleOptionChange}
              checked={value === number.toString()}
              name="my-accordion-1"
              aria-label="Timeline Accordion"
            />
            {/* <div className="collapse-title "></div> */}
          </>
        )}
        <div className="collapse-content shadow">
          <div className="grid grid-cols-2 lg:grid-cols-5">
            <div className="text-md md:text-[1.5rem] col-span-2 lg:col-span-3 pl-[2rem] pr-[2rem] md:pr-[8rem] flex flex-col justify-between">
              <span className="flex gap-2 text-[2.5rem]/[1.475rem] font-medium">
                {/* <IconCircleNumber3Filled className="w-[1em] h-[1em] inline-block align-text-bottom fill-[#BFF7F2] mask mask-circle" /> */}
                <div className="rounded-full size-[1.875rem] bg-[#BFF7F2]">
                  <p className="font-sans font-medium text-[20px]/[29px] text-center">{number}</p>
                </div>
                <h1 className=" font-mono font-medium pl-1">{title}</h1>
              </span>
              {/* <article className="prose text-lg  md:text-3xl text-wrap my-[2rem]">{parse(body)}</article> */}
              <div className="grid md:grid-flow-col justify-around gap-4 bottom-0 mb-4 w-full">
                {Array.isArray(stats) &&  stats.map((el)=>(
                  <div key={el?._id} className="stats size-[12rem] shadow bottom-0">
                    <div className="stat  bg-accent">
                      <div className="stat-title">
                        {/* <PiTargetFill className="w-[3rem] h-[3rem] fill-primary" />{" "} */}
                        <Image src={el?.icon?.secure_url} alt="icons" width={48} height={48} ></Image>
                        {/* <img src={el?.icon?.secure_url} className="size-[3rem]" alt="icon"/> */}
                      </div>
                      <div className="stat-desc text-[1rem] content-end">{el.title}</div>
                      <div className="stat-value text-[1.14rem]">{el.body}</div>
                    </div>
                  </div>
                ))}
               
                {/* <div className="stats size-[12rem] shadow bottom-0 ">
                  <div className="stat bg-accent">
                    <div className="stat-title">
                      <PiMapPinSimpleAreaFill className="w-[3rem] h-[3rem] fill-primary" />
                    </div>
                    <div className="stat-desc text-[1rem] content-end">Headquarters</div>
                    <div className="stat-value text-[1.14rem]">{stats[1]}</div>
                  </div>
                </div>
                <div className="stats size-[12rem] shadow bottom-0 ">
                  <div className="stat bg-accent">
                    <div className="stat-title">
                      <PiBuildingOfficeFill className="w-[3rem] h-[3rem] fill-primary" />
                    </div>
                    <div className="stat-desc text-[1rem] content-end">Established</div>
                    <div className="stat-value text-[1.14rem]">{stats[2]}</div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-span-2">
              <Image
                src={image}
                className="w-full aspect-square"
                alt={title}
                width={520}
                height={520}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Timeline() {
  const [value, setValue] = useState("1");
 const [portfolioData, setPortfolioData] = useState([])
   useEffect(()=>{
    const fetchData = async()=>{
     try {
       const data = await fetch(`${backendBaseUrl}/portfolio`)
       const res = await data.json()
       console.log("the res is", res)
       setPortfolioData(res.data);
     } catch (error) {
       console.log("the error is", error)
       throw error
     }
    }
    fetchData()
   },[])
  const handleOptionChange = (event: any) => {
    setValue(event.target.value);
    console.log("the value is", value)
  };

  return (
    <section className="min-h-[45vh] py-5 flex flex-col">
      <div className=" h-max max-w-screen-2xl sm:py-16 lg:px-6 py-8 px-4 mx-auto grow ">
        <div className="join join-vertical w-full">
          <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
           
         {Array.isArray(portfolioData) && portfolioData.map((el: any, index) => (
       <li key={el?._id}>  
         <div className="timeline-middle mt-4">
            <time className="font-mono text-[1.5rem]/[1.45rem] pt-6">
                {el?.investmentTimeline?.investmentYear}
            </time>
         </div>
        {TimelineCard(
                {
                  number: index+1,
                  title: el?.name,
                  body:el?.investmentTimeline?.description,
                  image: t_emo,
                  value,
                  stats: el?.investmentTimeline?.cards,
                },
                { setValue, handleOptionChange },
              )}
        <hr
            className={
                value === el?._id
                    ? `${classes["timeline-divider"]} width-[1px] overflow-visible` // Use template literal for string concatenation
                    : "width-[1px]"
             }
            />
        </li>
       ))}
            {/* <li>
              <div className="timeline-middle mt-4">
                <time className="font-mono text-[1.5rem]/[1.45rem] pt-6">2023</time>
              </div>
              {TimelineCard(
                {
                  number: 1,
                  title: "EMO",
                  body: (
                    <p>
                      EMO Energy is driving the <strong>net-zero future</strong> with{" "}
                      <strong>advanced battery solutions</strong>, redefining efficiency for{" "}
                      <strong>sustainable mobility</strong>. Their
                      <strong>in-house, 100% safe battery packs</strong> and <strong>BMS</strong>{" "}
                      are key to
                      <strong> decarbonizing mobility</strong> and <strong>energy storage</strong>.
                    </p>
                  ),
                  image: t_emo,
                  value,
                  stats: ["Mobility", "Bangalore, India", "2022"],
                },
                { setValue, handleOptionChange },
              )}
              <hr
                className={
                  value === "1"
                    ? classes["timeline-divider"] + " width-[1px] overflow-visible"
                    : "width-[1px]"
                }
              />
            </li>  */}
            {/* <li>
              <hr className="width-[1px]" />
              <div className="timeline-middle  mt-4">
                <time className="font-mono text-[1.5rem]/[1.45rem] pt-6">2024</time>
              </div>
              {TimelineCard(
                {
                  number: 2,
                  title: "Matel",
                  body: (
                    <p>
                      MATEL develops advanced <strong>electric powertrain</strong> solutions for
                      vehicles and industry, driven by its unique I{" "}
                      <strong>Powertrain™ technology</strong>. The company focuses on{" "}
                      <strong>energy efficiency</strong> and <strong>reliability</strong> to meet
                      global sustainability goals.
                    </p>
                  ),
                  image: t_matel,
                  value,
                  stats: ["Mobility", "Pune, India", "2017"],
                },
                { setValue, handleOptionChange },
              )}
              <hr
                className={
                  value === "2"
                    ? classes["timeline-divider"] + " width-[1px] overflow-visible"
                    : "width-[1px]"
                }
              />
            </li>
     
            <li>
              <hr className="width-[1px] " />
              <div className="timeline-middle  mt-4">
                <time className="font-mono text-[1.5rem]/[1.45rem] pt-6">2024</time>
              </div>
              {TimelineCard(
                {
                  number: 3,
                  title: "Protonas",
                  body: (
                    <p>
                      Protonas is revolutionising the <strong>hydrogen economy</strong> with
                      affordable <strong>fuel cell products</strong>. We're pioneering a cleaner
                      future, starting in North America and expanding globally, with a seasoned team
                      driving our cutting-edge technology.
                    </p>
                  ),
                  image: t_protonas,
                  value,
                  stats: ["Hydrogen", "Tennessee, US", "2024"],
                },
                { setValue, handleOptionChange },
              )}
            </li> */}
          </ul>
        </div>
      </div>
    </section>
  );
}
