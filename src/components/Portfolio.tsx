"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import sq_matel from "../../public/img/investments/sq_matel.png";
import sq_emo from "../../public/img/investments/sq_emo.png";
import sq_protonas from "../../public/img/investments/sq_protonas.png";

export default function Portfolio() {
  return (
    <section className="relative border border-[#ADE9E4] min-h-[45vh] py-5 flex flex-col overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow"></div>
      <div className="relative z-10 h-max max-w-screen-2xl sm:py-16 lg:px-6 py-8 px-4 mx-auto grow content-center">
        <div className="grid grid-flow-row grid-cols-1 place-content-center">
          <h3 className="tracking-[.6rem] text-[#5C5C5C] font-medium text-center mb-8">
            Our Portfolio
          </h3>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 place-content-center gap-12">
            <Link href="/portfolio" className="flex justify-center items-center ">
              <Image
                src={sq_matel}
                alt="Matel"
                width={180}
                height={38}
                priority
                className="hover:scale-110 transition-transform duration-300 hover:border-4 hover:border-primary hover:rounded-[3rem]"
              />
            </Link>
            <Link href="/portfolio" className="flex justify-center items-center">
              <Image
                src={sq_emo}
                alt="EMO"
                width={180}
                height={38}
                priority
                className="hover:scale-110 transition-transform duration-300 hover:border-4 hover:border-primary hover:rounded-[3rem]"
              />
            </Link>
            <Link href="/portfolio" className="flex justify-center items-center">
              <Image
                src={sq_protonas}
                alt="Protonas"
                width={180}
                height={38}
                priority
                className="hover:scale-110 transition-transform duration-300 hover:border-4 hover:border-primary hover:rounded-[3rem]"
              />
            </Link>
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
