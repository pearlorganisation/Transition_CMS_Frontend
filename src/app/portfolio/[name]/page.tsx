"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AbstractHero from "@/components/AbstractHero";
import { PiSparkleFill, PiQuotesFill } from "react-icons/pi";
import bg_portfolio_detail from "../../../../public/img/bg-portfolio-detail.png";
import { useSearchParams } from "next/navigation";
import { backendBaseUrl } from "@/components/utils/backendUrl";
import parse from "html-react-parser";

interface Portfolio {
  title: string;
  mainDescription: string;
  cards: { title: string; description: string }[];
  bottomSectionContent: string;
  coInvestedBy: { _id: string; logo: { secure_url: string }; name: string }[];
}

type PageProps = {
  params: { name: string };
   
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function PortfolioDetail() {
  const searchParamsHook = useSearchParams();
  const id = searchParamsHook.get('id');
  
  const [singlePortfolio, setSinglePortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${backendBaseUrl}/portfolio/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        const data = await res.json();
        setSinglePortfolio(data.data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
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

  return (
    <>
      <AbstractHero content={singlePortfolio.title} bg={bg_portfolio_detail.src} />
      <section className="min-h-[40vh] py-5 container center mx-auto">
        <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-16 lg:px-6">
          <article className="text-lg text-start md:w-[80%]">{singlePortfolio.mainDescription}</article>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {singlePortfolio.cards?.map((section, index) => (
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
      <div className="relative min-h-[45vh] quote-grid mx-auto px-4 py-16 flex justify-center items-center bg-gradient-to-br from-yellow-50 to-yellow-100 overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow"></div>
        <div className="max-w-4xl z-10 flex flex-col justify-center items-center">
          <div className="bg-yellow-100 text-[2rem] rounded-2xl p-[2rem] m-[1rem] shadow-md aspect-square">
            <PiQuotesFill className="w-[1em] h-[1em] justify-center align-text-center text-yellow-600" />
          </div>
          <blockquote className="text-center text-lg sm:text-xl md:text-2xl font-normal text-gray-800 leading-relaxed">
            {singlePortfolio.bottomSectionContent}
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
      {singlePortfolio.coInvestedBy?.length > 0 && (
        <section className="relative border border-[#ADE9E4] min-h-[45vh] py-5 flex flex-col overflow-hidden">
          <div className="absolute inset-0 bg-radial-glow"></div>
          <div className="relative z-10 h-max max-w-screen-2xl sm:py-16 lg:px-6 py-8 px-4 mx-auto grow content-center">
            <div className="grid grid-flow-row grid-cols-1 place-content-center">
              <h3 className="tracking-[.6rem] text-[#5C5C5C] font-medium text-center mb-8">CO-INVESTED BY</h3>
              <div className="grid grid-flow-row grid-cols-1 place-content-center gap-8">
                <div className="flex justify-center items-center">
                  {singlePortfolio.coInvestedBy?.map((investor) => (
                    <Image
                      key={investor._id}
                      src={investor.logo.secure_url}
                      alt={investor.name}
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