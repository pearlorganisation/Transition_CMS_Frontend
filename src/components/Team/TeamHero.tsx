"use client";

import React from "react";
// import Image from "next/image";
import AbstractHero from "@/components/AbstractHero";
import ScrollIndicator from "../ScrollIndicator";
import team_bg from "../../../public/img/bg-team.png";

const heroBodyContent = [
  {
    name: "mission",
    num: 1,
    body: (
      <p className="mb-5">
        {`Transition VC leads the charge in powering India’s New Energy Future, tackling 1% of the nation’s annual emissions.`}
      </p>
    ),
  },
  {
    name: "invest",
    num: 2,
    body: (
      <p className="mb-5">
        {`"We invest in breakthrough technologies accelerating India’s net zero Journey."`}
      </p>
    ),
  },
  {
    name: "stats",
    num: 3,
    body: (
      <div className="justify-center w-full px-5 flex gap-5">
        <div className="stats shadow glass">
          <div className="stat ">
            <div className="stat-title">Total Page Views</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
        <div className="stats shadow glass ">
          <div className="stat">
            <div className="stat-title">Total Page Views</div>
            <div className="stat-value">89,400</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>
      </div>
    ),
  },
];

function scrollCarousel(targetImageNumber: number, carouselElement: HTMLElement | null) {
  if (!carouselElement) {
    return;
  }
  let carouselWidth = carouselElement.clientWidth;

  // Images are numbered from 1 to 4 so thats why we substract 1
  let targetImage = targetImageNumber - 1;

  let targetXPixel = carouselWidth * targetImage + 1;

  carouselElement.scrollTo(targetXPixel, 0);
}

export default function TeamHero() {
  const carouselElement = React.useRef(null);

  const content = (
    <div>
      Meet Our Leadership Team: <strong>Driving Impact, Leading Change</strong>
    </div>
  );

  return (
    // <div className="hero min-h-screen" style={{ backgroundImage: `url(${team_bg.src})` }}>
    //   <div className="hero-overlay bg-transparent bg-gradient-to-t from-white to-transparent"></div>
    //   <div className="hero-content text-neutral-content h-full w-full mx-auto relative">
    //     <div className="max-w-full md:max-w-7xl w-max pr-[22%] absolute top-[18%]">
    //       <h1 className="mb-5 text-[4rem] font-normal font-mono text-black">
    //         Meet Our Leadership Team: <strong>Driving Impact, Leading Change</strong>
    //       </h1>
    //     </div>
    //     <div className="absolute bottom-[22.2%]">
    //     <ScrollIndicator href="#"/>
    //     </div>
    //   </div>
    // </div>
    <AbstractHero content={content} bg={team_bg.src} />
  );
}
