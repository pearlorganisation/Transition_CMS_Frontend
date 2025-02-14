"use client";
import React, { useState, useEffect, useRef } from "react";
import { getFocusArea } from "../lib/database/action/homeAction"
// import Image from "next/image";
import {
  IconBuildingFactory2,
  IconCircleArrowDownFilled,
  IconCircleArrowUpFilled,
  IconCircleArrowLeft,
  IconCircleArrowRight,
  IconHelicopterLanding,
} from "@tabler/icons-react";
import {
  PiCarProfileFill,
  PiLockersFill,
  PiTreeFill,
  PiSolarPanelFill,
  PiWindmillFill,
  PiArrowRightFill,
  PiArrowLeftFill,
} from "react-icons/pi";
function FocusCard({
  image,
  title,
  features,
}: {
  image: { secure_url: string };
  title: string;
  features: string[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="card bg-base-100 shadow-lg border-2 w-full h-auto">
      <div className="card-body flex flex-col">
        {/* Image container matching icon size and shape */}
        <div className="size-14 rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={image.secure_url}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <p className="text-2xl text-wrap mt-4 min-h-16">{title}</p>
        
        <div className={`collapse ${isExpanded ? "collapse-open" : ""}`}>
          <div className="collapse-content">
            <article className="text-wrap prose">
              {/* Feature list styled like original paragraph */}
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="text-base">{feature}</div>
                ))}
              </div>
            </article>
          </div>
        </div>
        
        <button
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          className="mt-auto text-2xl px-0 text-primary self-start hover:bg-transparent"
        >
          <span className="flex items-center gap-2">
            {isExpanded ? "Collapse" : "View Details"}
            {isExpanded ? (
              <IconCircleArrowUpFilled className="w-[1em] h-[1em] inline-block align-text-bottom" />
            ) : (
              <IconCircleArrowDownFilled className="w-[1em] h-[1em] inline-block align-text-bottom" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
 

export default function  FocusArea() {
  const currentCardRef = useRef<HTMLDivElement | null>(null);
  const [focusData, setFocusData]= useState<any>([]);
useEffect(() => {
  const fetchFocus = async () => {
    try {
      const data = await getFocusArea();
      setFocusData(data.data);
    } catch (error) {
      console.error("Error fetching focus area data:", error);
    }
  };
  fetchFocus();
}, []);
  // focusData = await getFocusArea()
  // console.log("the focus data is", focusData)
  useEffect(() => {
    // Set the initial ref to the first card
    if (focusData[0]?.focusAreas?.length > 0) {
      currentCardRef.current = document.getElementById(focusData[0]?.focusAreas[0]?._id) as HTMLDivElement;
    }
  }, [focusData[0]?.focusAreas]);

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
        const firstCard = document.getElementById(focusData[0]?.focusAreas[0]?._id) as HTMLDivElement;
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
          focusData[0]?.focusAreas[focusData[0]?.focusAreas?.length - 1]._id,
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
    <section className="min-h-[45vh] py-5 container mx-auto flex flex-col">
      <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-16 lg:px-6 grow content-center">
        <div className="grid grid-cols-1">
          <div className="flex">
            <div className="min-h-72 md:w-3/4 md:pr-[20%]">
              <h3 className="tracking-[.6rem] text-[#5C5C5C] font-medium mb-6">Focus Area</h3>
              <div className="prose text-xl lg:text-3xl text-wrap">
                {/* <h3 className="font-light">
                  At Transition VC, we identify teams focused on technologies; the energy transition
                  divides into <span className="text-primary">Energy Demand</span> and{" "}
                  <span className="text-primary">Energy Supply.</span>
                </h3> */}
                  <h3 className="font-light">
                  {focusData?.[0]?.title} <span className="text-primary">Energy Demand</span> and{" "}
                  <span className="text-primary">Energy Supply.</span>
                </h3>
              </div>
            </div>
            <div className="md:w-1/4 hidden md:flex md:flex-row-reverse">
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
          <div className="carousel flex flex-nowrap gap-5 w-full items-start overflow-x-auto scroll-smooth">
             
           {Array.isArray(focusData) && focusData.map((item) => (
              item?.focusAreas?.map((el: any) => (
                <div
                  id={el?._id}
                  key={el?._id}  
                  className="carousel-item w-[90%] md:w-[40%] lg:w-[22.2%] flex-shrink-0"
                >
                  <FocusCard
                    image={el?.image}   
                    title={el?.title}   
                    features={el?.features}   
                  />
                </div>
              ))
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}



{/**    static focus card data */}
/**
 * const focusCards = [
  {
    name: "focus-one",
    icon: <PiCarProfileFill className="w-full h-full" />,
    title: (
      <>
        Mobility/
        <br />
        Transportation
      </>
    ),
    body: (
      <ul>
        <li>
          Subcomponents – Motors Controllers, Battery Packs and Charger, Alternative Chemistry
        </li>
        <li>Platform and Services –Financing, EV Servicing, etc.</li>
        <li>OEM – LCM and Buses</li>
      </ul>
    ),
  },
  {
    name: "focus-two",
    icon: <PiLockersFill className="w-full h-full" />,
    title: (
      <span>
        Energy Storage
        <br />
        &thinsp;
      </span>
    ),
    body: (
      <ul>
        <li>Battery Storage - Long Duration - RFB , Thermal . Medium - Li, Na ion</li>
        <li> Recycling</li>
      </ul>
    ),
  },
  {
    name: "focus-three",
    icon: <IconBuildingFactory2 className="w-full h-full" />,
    title: <>Decarbonisation of Industry</>,
    body: (
      <ul>
        <li>Energy Efficiency - Machine Monitoring and Control , Waste Heat Recovery </li>
        <li>Alternative fuels -Biofuels</li>
        <li>Carbon Infra - Emission Monitoring, Carbon Capture . Utilisation and Sequestration</li>
      </ul>
    ),
  },
  {
    name: "focus-four",
    icon: <IconHelicopterLanding className="w-full h-full" />,
    title: (
      <>
        Hydrogen
        <br />
        &thinsp;
      </>
    ),
    body: (
      <ul>
        <li>Generation - Electrolyser Components , Efficient SMR reactors</li>
        <li>Utilisation - Fuel Cell , Combustion Engine</li>
      </ul>
    ),
  },
  {
    name: "focus-five",
    icon: <PiTreeFill className="w-full h-full" />,
    title: (
      <>
        Power Electronics
        <br />
        &thinsp;
      </>
    ),
    body: <>Power Semiconductors - Power Converters</>,
  },
  {
    name: "focus-six",
    icon: <PiWindmillFill className="w-full h-full" />,
    title: (
      <>
        Net Zero for Buildings
        <br />
        &thinsp;
      </>
    ),
    body: (
      <ul>
        <li>Energy Efficiency - HAVC Optimisation</li>
        <li>Building Materials - Alternative Concrete</li>
        <li>Virtual Power Plants</li>
      </ul>
    ),
  },
  {
    name: "focus-seven",
    icon: <PiSolarPanelFill className="w-full h-full" />,
    title: (
      <>
        Renewables
        <br />
        &thinsp;
      </>
    ),
    body: (
      <ul>
        <li>Solar - Materials, Financing and Platforms</li>
        <li>Wind - Materials , Financing and Platforms</li>
      </ul>
    ),
  },
];
 */