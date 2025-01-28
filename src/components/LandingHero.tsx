"use client";
import React, { useState, useRef, useEffect } from "react";
import ScrollIndicator from "./ScrollIndicator";
import { PiCoinsFill, PiWindFill } from "react-icons/pi";
import hero_bg from "../../public/img/bg-hero.png";

interface HeroBodyContentItem {
  name: string;
  num: number;
  body: React.ReactNode;
}

const heroBodyContent: HeroBodyContentItem[] = [
  {
    name: "mission",
    num: 1,
    body: (
      <p className="mb-5">{`Transition VC leads the charge in powering India's New Energy Future, tackling 1% of the nation's annual emissions.`}</p>
    ),
  },
  {
    name: "invest",
    num: 2,
    body: <p className="mb-5">{`"We invest in breakthrough technologies accelerating India's net zero Journey."`}</p>,
  },
  {
    name: "stats",
    num: 3,
    body: (
      <div className="w-full px-5 flex flex-col lg:flex-row gap-5 justify-center h-auto items-center">
        <div className="shadow glass rounded-2xl w-full lg:w-[50%] ">
          <div className="flex flex-row gap-2 md:gap-4 items-center justify-center p-3 md:p-6 ">
            <div className="size-[2.1rem] md:size-[2.5rem] text-primary order-first">
              <PiCoinsFill className="w-full h-full" />
            </div>
            <div className="grow">
              <div className="stat-value self-end text-left text-lg md:text-[1.5rem]">$ 200B</div>
              <div className="stat-desc self-start text-left text-xs md:text-base font-sans">Energy Transition TAM in India 2030</div>
            </div>
          </div>
        </div>
        <div className="shadow glass rounded-2xl w-full lg:w-[50%] ">
          <div className="flex flex-row gap-2 md:gap-4 items-center justify-center p-3 md:p-6 ">
            <div className="size-[2.1rem] md:size-[2.5rem] text-primary order-first">
              <PiWindFill className="w-full h-full" />
            </div>
            <div className="grow">
              <div className="stat-value self-end text-left text-lg md:text-[1.5rem]">10K+ TONNES</div>
              <div className="stat-desc self-start text-left text-xs md:text-base font-sans">CO2</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

function scrollCarousel(
  targetImageNumber: number,
  carouselElement: HTMLElement | null,
  setValue: React.Dispatch<React.SetStateAction<number>>,
): void {
  if (!carouselElement) {
    return;
  }
  const carouselWidth = carouselElement.clientWidth;
  const targetImage = targetImageNumber - 1;
  const targetXPixel = carouselWidth * targetImage;
  carouselElement.scrollTo({ left: targetXPixel, behavior: "smooth" });
  setValue(targetImageNumber);
}

export default function LandingHero(): JSX.Element {
  const carouselElement = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselElement.current) {
        const scrollPosition = carouselElement.current.scrollLeft;
        const itemWidth = carouselElement.current.clientWidth;
        const newIndex = Math.round(scrollPosition / itemWidth) + 1;
        setActiveIndex(newIndex);
      }
    };

    const currentCarouselElement = carouselElement.current;
    if (currentCarouselElement) {
      currentCarouselElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (currentCarouselElement) {
        currentCarouselElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Auto scroll
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const autoScroll = () => {
      if (!isHovering && carouselElement.current) {
        const nextIndex = activeIndex === heroBodyContent.length ? 1 : activeIndex + 1;
        scrollCarousel(nextIndex, carouselElement.current, setActiveIndex);
      }
    };

    intervalId = setInterval(autoScroll, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [activeIndex, isHovering]);

  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url(${hero_bg.src})` }}>
      <div className="hero-overlay bg-transparent bg-gradient-to-t from-white to-transparent"></div>
      <div className="flex justify-center items-center w-full h-full">
        <div className="hero-content text-neutral-content text-center h-full w-[90vw] md:w-[57vw] relative flex flex-col">
          <h1 className="mb-5 text-4xl lg:text-[4rem]/[5rem] font-normal font-mono text-black mt-[9vh] lg:mt-[6rem]">
            On a mission to offset 40 million tons of carbon.
          </h1>
          {/* <div className="carousel w-full snap-x snap-mandatory" ref={carouselElement}> */}
          <div
            className="carousel w-full snap-x snap-mandatory"
            ref={carouselElement}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {heroBodyContent.map((item) => (
              <div
                id={item.name}
                key={item.name}
                className="carousel-item w-full snap-start justify-center text-2xl lg:text-[2rem]/[3rem] font-mono text-black"
              >
                {item.body}
              </div>
            ))}
          </div>
          <div className="flex w-full content-center justify-center items-center pt-10 gap-2">
            {heroBodyContent.map((item) => (
              <button
                key={item.num}
                onClick={() => scrollCarousel(item.num, carouselElement.current, setActiveIndex)}
                className={`cursor-pointer transition-all duration-300 ${
                  activeIndex === item.num ? "w-8 h-2 bg-[#10736A]" : "w-2 h-2 bg-slate-500 hover:bg-slate-400"
                } rounded-full`}
                aria-label={`Scroll to ${item.name}`}
              />
            ))}
          </div>
          <div className="pt-16">
            <ScrollIndicator />
          </div>
        </div>
      </div>
    </div>
  );
}
