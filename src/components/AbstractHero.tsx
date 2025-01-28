"use client";

import React, { ReactElement } from "react";
// import Image from "next/image";
import ScrollIndicator from "./ScrollIndicator";

export default function TeamHero({ content, bg }: { content: ReactElement; bg: string }) {
  return (
    <div className="hero min-h-screen" style={{ backgroundImage: `url(${bg})` }}>
      <div className="hero-overlay bg-transparent bg-gradient-to-t from-white to-transparent"></div>
      <div className="flex justify-center items-center w-full h-full">
        <div className="hero-content text-neutral-content text-center h-full w-[90vw] md:w-[60vw] relative flex flex-col">
          <div className="max-w-full md:max-w-7xl w-max md:pr-[27%] absolute top-[18%]">
            <h1 className="mb-5 text-4xl lg:text-[4rem]/[5rem] font-normal font-mono text-left text-black mt-[9vh] lg:mt-0">
              {content}
            </h1>
          </div>
          <div className="absolute bottom-[22.2%]">
            <div className="pt-16">
              <ScrollIndicator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
