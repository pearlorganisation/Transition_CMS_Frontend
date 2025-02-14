"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AbstractHero from "@/components/AbstractHero";
import NewsSection from "@/components/NewsSection";
import InvestmentHighlightSections from "@/components/InvestmentHighlightSections";
import { PiSparkleFill, PiQuotesFill } from "react-icons/pi";
import bg_portfolio_detail from "../../../../public/img/bg-portfolio-detail.png";
import sq_gruhas from "../../../../public/img/investments/sq_gruhas.png";
import sq_millennium from "../../../../public/img/investments/sq_millennium.png";
import { useRouter, useSearchParams } from "next/navigation";
import { backendBaseUrl } from "@/components/utils/backendUrl";
import parse from "html-react-parser"
 
const co_investors = { gruhas: sq_gruhas, millennium: sq_millennium };
interface PortfolioDetailProps {
  params: { name: string };
}
export default function PortfolioDetail({ params }: PortfolioDetailProps) {
 
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    interface Portfolio {
      title: string;
      mainDescription: string;
      cards: { title: string; description: string }[];
      bottomSectionContent: string;
      coInvestedBy: { _id: string; logo: { secure_url: string }; name: string }[];
    }
    
    const [singlePortfolio, setSinglePortfolio] = useState<Portfolio | null>(null);
    const [loading, setLoading] = useState(true);
    console.log("The id is", id);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(`${backendBaseUrl}/portfolio/${id}`);
          const data = await res.json();
          setSinglePortfolio(data.data);
        } catch (error) {
          console.log("the error is", error);
          throw error;
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [id]);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!singlePortfolio) {
      return <div>No data available</div>;
    }

    console.log("the data from the id is", singlePortfolio);

  const content = {
    emo: {
      title: (
        <div>
          Why we Invested in
          <br />
          <strong>EMO</strong>.
        </div>
      ),
      summary: (
        <p>
          EMO Energy, a pioneering company that is revolutionizing the Indian Electric Vehicle (EV) industry. Founded in 2021 by Sheetanshu Tyagi and
          Rahul Patel, EMO Energy is dedicated to developing Safe, Powerful Battery Packs that can be charged within minutes, facilitating the
          widespread adoption of electric vehicles in India. With their innovative in-house Battery Management System (BMS) and cutting-edge battery
          technology, EMO Energy is well-positioned to become a leading powertrain company in India.
        </p>
      ),
      cards: [
        {
          title: "Addressing Critical Challenges",
          content: (
            <>
              <p>
                EMO Energy directly addresses the significant challenges faced by consumers in the Indian electric two-wheeler (E2W) and three-wheeler
                (E3W) markets, such as battery overheating, limited driving range, and slow charging times. These issues are particularly problematic
                in India's hot climate, where many battery packs are prone to safety risks like fires. EMO Energy’s advanced battery technology
                ensures enhanced safety, better performance, and rapid charging, even in extreme environmental conditions.
              </p>
              <p>
                Original Equipment Manufacturers (OEMs) in India have been grappling with subpar battery performance, often due to reliance on
                imported cells with inconsistent quality. Additionally, OEMs face difficulties in meeting stringent government regulations, including
                the new AIS 156 standards. EMO Energy’s solutions provide high-quality, reliable battery packs that comply with these regulations,
                supporting OEMs in delivering safer and more efficient electric vehicles."
              </p>
            </>
          ),
        },
        {
          title: "Capitalizing on a Fragmented Market",
          content: (
            <p>
              The Indian E2W and E3W markets are highly fragmented, with many smaller players lacking the in-house research and development
              capabilities necessary to create high-performance battery solutions. EMO Energy is filling this gap by offering innovative, high-quality
              battery packs that cater to both established industry leaders and emerging OEMs. By 2025, EMO Energy is poised to capture a significant
              market share, potentially dominating 50%-75% of the 2W market and 70%-85% of the 3W market, translating into an estimated $3 Billion
              market value.
            </p>
          ),
        },
        {
          title: "Innovative Solutions Driving Future Growth",
          content: (
            <>
              <p>
                EMO Energy's proprietary DTM system uses a specialized dielectric fluid to efficiently cool battery cells, ensuring consistent
                operation and rapid charging even in hot climates. This software-controlled system is crucial for maintaining optimal battery
                temperature and performance.
              </p>
              <p>
                EMO Energy prioritizes scalability, affordability, and durability in their battery pack design. Their packs are engineered for tight
                cell packing and protected against environmental factors like dust and water, making them ideal for mass production and ensuring
                long-lasting, reliable performance.
              </p>
              <p>
                EMO Energy’s BMS is designed to handle high current flows, provide real-time health and safety analysis, and facilitate seamless
                communication with server-based data processing systems. The integration of machine learning allows for proactive battery management,
                improving reliability and predicting potential failures, which is key to extending battery life and optimizing overall performance.
              </p>
            </>
          ),
        },
      ],
      investors: ["gruhas"],
    },
    matel: {
      title: (
        <div>
          Why we invested in
          <br />
          <strong>MATEL</strong>.
        </div>
      ),
      summary: (
        <p>
          <strong>
            Matel is at the forefront of electric powertrain innovation, delivering advanced solutions for vehicles and industrial applications.
          </strong>
          Their all-encompassing I Powertrain™ technology, which includes motors, controllers, and drivetrains, ensures superior performance and
          reliability. With a strong focus on energy efficiency, Matel is well-positioned to meet the growing global demand for sustainable power
          solutions. <strong>Their deep industry expertise and data-driven approach</strong> allow them to continually refine their offerings, making
          them a leader in the evolving electric mobility market.
        </p>
      ),
      cards: [
        {
          title: "Comprehensive Market Opportunity",
          content: (
            <>
              <p>
                The electric motors and controllers market is at the heart of the ongoing energy transition, particularly with the global shift
                towards electric vehicles (EVs). In India alone, the motors and controllers segment is projected to reach USD 6 billion by 2030,
                reflecting the enormous growth potential in just a single country. However, the opportunities for Matel extend well beyond the EV
                segment.Motors and controllers are crucial in various other industries such as HVAC, where motors drive key components like pumps,
                which are essential for climate control systems.
              </p>
              <p>
                Additionally, these components are integral to medical devices and testing machines, ensuring precise operation in healthcare
                settings. The defense sector also relies heavily on motors in various applications, including aviation, ground vehicles, and other
                critical equipment. Matel’s all-in-one powertrain solutions uniquely position the company to capture a significant share across these
                diverse and expanding industries, offering tailored solutions that meet the specific needs of each sector.
              </p>
            </>
          ),
        },
        {
          title: "Unique, Integrated Solutions",
          content: (
            <p>
              The electric motor and controller industry is characterized by fragmentation, with only a few companies offering a fully integrated
              solution. Many large manufacturers specialize in either motors or controllers, while other mechanical components are often sourced from
              different vendors. This fragmented approach can lead to inefficiencies and compatibility issues, which can ultimately affect the
              performance and reliability of the final product. Matel sets itself apart by designing, developing, and manufacturing the entire
              drivetrain—from the battery to the wheel— including the motor controller, motor, gearbox, differential, and axle. This comprehensive
              approach provides several significant advantages. By controlling the entire process, Matel can ensure superior performance and enhanced
              reliability, as components are optimized to work seamlessly together. The integrated system allows for better and faster motor tuning,
              which enhances overall efficiency and robustness. Furthermore, OEMs prefer to work with a single supplier for these critical components,
              as it simplifies supply chain management, reduces complexity, and minimizes the number of vendors they must coordinate with. This
              preference gives Matel a competitive edge, as they can offer a complete, turnkey solution that meets the needs of vehicle manufacturers
              while also improving their margins.
            </p>
          ),
        },
        {
          title: "Proven Technology and Strong Leadership",
          content: (
            <>
              <p>
                Matel’s technology has been thoroughly tested, with over 100,000 drive systems deployed for solar pumps and industrial use. Their
                proprietary Permanent Magnet Synchronous Motor (PMSM) designs, known for high efficiency and stability, are paired with sine wave
                controllers for smooth, reliable operation. With motors ranging from 1KW to 50KW, Matel is well-positioned to capture a significant
                share of the EV market, including electric four-wheelers.
              </p>
              <p>
                The leadership team—veterans from top companies like Bajaj, Ola, Maruti, Crompton, and Siemens—brings deep expertise in both rapid
                prototyping and mass production, ensuring Matel stays ahead in the industry.
              </p>
            </>
          ),
        },
      ],
      investors: ["gruhas", "millennium"],
    },
    protonas: {
      title: (
        <div>
          Why we invested in
          <br />
          <strong>PROTONAS</strong>.
        </div>
      ),
      summary: (
        <p>
          Protonas is an innovative company at the forefront of fuel cell technology, dedicated to providing efficient and cost-effective power
          solutions. With a focus on long-duration power backup systems, Protonas addresses the growing need for reliable energy in the face of
          unpredictable renewable sources and frequent severe weather events. By targeting both the USA and Indian markets, Protonas is strategically
          positioned to revolutionize the power backup and fuel cell industry. Their cutting-edge technologies, including a 2kW closed cathode
          air-cooled system and a 12kW liquid-cooled system, aim to make hydrogen fuel cells more accessible and affordable, setting new industry
          standards.
        </p>
      ),
      cards: [
        {
          title: "Addressing Critical Energy Challenges",
          content: (
            <>
              <p>
                Protonas is directly tackling the urgent need for reliable, long-duration power backup systems, a challenge that has become
                increasingly important as the world shifts towards renewable energy sources. While renewable energy sources like wind and solar are
                essential for a sustainable future, they are inherently intermittent, which can lead to instability in power supply. Furthermore,
                severe weather events, such as hurricanes in the USA, can disrupt traditional power grids for extended periods, leading to prolonged
                power outages. Protonas’s hydrogen fuel cells provide a solution to these challenges by offering efficient and clean electricity with
                the capability for long-term storage. This makes their technology ideal for stabilizing power grids during peak demand periods and
                ensuring a consistent power supply during extreme weather events.
              </p>
            </>
          ),
        },
        {
          title: "Significant Market Potential in USA and India",
          content: (
            <p>
              Protonas has identified substantial market opportunities in both the USA and India, two regions with growing demand for reliable backup
              power solutions. In the USA, the increasing frequency of severe weather events and the rapid adoption of renewable energy have driven a
              surge in demand for products like the Tesla Powerwall. Protonas is poised to capture a significant share of this market by initially
              focusing on the sub-2kW power backup segment, which is expected to reach a market value of $3 billion by 2030. Furthermore, Protonas's
              development of a 12kW liquid-cooled stack positions them to enter the lucrative telecom tower backup power market, also projected to be
              a $3 billion opportunity. In India, Protonas is targeting the burgeoning market for hydrogen fuel cell systems in three-wheelers and
              lightweight commercial vehicles, which is expected to reach a market value of $1 billion by 2030. This dual-market strategy not only
              diversifies Protonas’s revenue streams but also positions them as a key player in the global energy transition.
            </p>
          ),
        },
        {
          title: "Innovative Cost Reduction Strategies for Widespread Adoption",
          content: (
            <>
              <p>
                One of the major barriers to the widespread adoption of hydrogen fuel cells has been their high cost. Protonas is at the forefront of
                overcoming this challenge by developing innovative strategies to significantly reduce costs. They are currently working on both a 2kW
                closed cathode air-cooled system and a 12kW liquid-cooled system, with a focus on leveraging advancements in catalyst manufacturing
                and bipolar plate design. Protonas aims to achieve a production cost of $1 per watt, a figure well below the current industry average.
                This cost reduction is crucial for making fuel cell technology more accessible and competitive, especially in high-demand applications
                such as grid stabilization and backup power systems. Additionally, Protonas's use of advanced design methodologies and strategic
                partnerships, such as their collaboration with Sigma Pi in Chennai for R&D, underscores their commitment to driving innovation while
                maintaining cost efficiency. These efforts not only make Protonas's products more affordable but also enhance their scalability and
                suitability for a wide range of applications across different markets.
              </p>
            </>
          ),
        },
      ],
      investors: [],
    },
  };
  // const page = params.name as keyof typeof content;
  return (
    <>
      <AbstractHero content={singlePortfolio?.title} bg={bg_portfolio_detail.src} />
      <section className="min-h-[40vh] py-5 container center mx-auto">
        <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-16 lg:px-6">
          <article className="text-lg text-start md:w-[80%]">{singlePortfolio?.mainDescription}</article>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {singlePortfolio?.cards?.map((section, index) => (
            <div key={index} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <span className="flex items-center gap-2">
                  <div className="text-4xl text-primary mb-4">
                    <PiSparkleFill className="w-[1em] h-[1em] inline-block align-text-bottom" />
                  </div>
                  <h2 className="card-title mb-4">{parse(section.title)}</h2>
                </span>
                <article className="prose">{parse(section.description)}</article>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/*  */}
      <div className="relative min-h-[45vh] quote-grid mx-auto px-4 py-16 flex justify-center items-center bg-gradient-to-br from-yellow-50 to-yellow-100 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow"></div>
        <div className="max-w-4xl z-10 flex flex-col justify-center items-center">
          <div className="bg-yellow-100 text-[2rem] rounded-2xl p-[2rem] m-[1rem] shadow-md aspect-square">
            <PiQuotesFill className="w-[1em] h-[1em] justify-center align-text-center text-yellow-600" />
          </div>
          <blockquote className="text-center text-lg sm:text-xl md:text-2xl font-normal text-gray-800 leading-relaxed">
            {/* "EMO's ZEN Platform, with advanced thermal management and AI-driven battery optimization, enhances battery lifespan and performance,
            supporting India's EV goals and Net-Zero ambitions. EMO is set to transform India's battery-tech sector." */}
            {singlePortfolio?.bottomSectionContent}
          </blockquote>
        </div>
        <style jsx>{`
          .quote-grid {
            background-image: linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
            background-size: 100px 100px;
          }

          .bg-radial-glow {
            background-image: radial-gradient(
              circle at 50% 50%,
              rgba(225, 229, 0, 0.1) 0%,
              rgba(225, 229, 0, 0.1) 20%,
              transparent 50%,
              transparent 100%
            );
          }
        `}</style>
      </div>
      {/*  */}
      {singlePortfolio?.coInvestedBy?.length > 0 && (
        <section className="relative border border-[#ADE9E4] min-h-[45vh] py-5 flex flex-col overflow-hidden">
          <div className="absolute inset-0 bg-radial-glow"></div>
          <div className="relative z-10 h-max max-w-screen-2xl sm:py-16 lg:px-6 py-8 px-4 mx-auto grow content-center">
            <div className="grid grid-flow-row grid-cols-1 place-content-center">
              <h3 className="tracking-[.6rem] text-[#5C5C5C] font-medium text-center mb-8">CO-INVESTED BY</h3>
              <div className="grid grid-flow-row grid-cols-1 place-content-center gap-8">
                <div className="flex justify-center items-center">
                  {singlePortfolio?.coInvestedBy?.map((investor) => (
                    <Image
                      key={investor?._id}
                      src={investor?.logo?.secure_url}
                      alt={investor?.name}
                      width={180}
                      height={38}
                      priority
                      className="hover:scale-110 transition-transform duration-300"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
