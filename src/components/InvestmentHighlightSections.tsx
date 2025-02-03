"use client";
import React, { ReactElement } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { IconCircleArrowRightFilled } from "@tabler/icons-react";
import sq_matel from "../../public/img/investments/sq_matel.png";
import sq_emo from "../../public/img/investments/sq_emo.png";
import sq_protonas from "../../public/img/investments/sq_protonas.png";
import parse from 'html-react-parser'
interface InvestmentCardInterface {
  name: string;
  link: string;
  body: string;
  image: {secure_url: string};
}

function InvestmentCard({ name, link, body, image }: InvestmentCardInterface) {
  return (
    <section className="relative min-h-[45vh] py-5 flex flex-col overflow-hidden">
      <div className="relative z-10 h-max max-w-screen-2xl sm:py-16 lg:px-6 py-8 px-4 mx-auto grow content-center">
        <div className="grid grid-flow-row grid-cols-1 place-content-center">
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 place-content-center gap-8">
            <a href={link} target="_blank" className="flex justify-center items-center">
              <Image
                src={image.secure_url}
                alt="Matel"
                width={180}
                height={38}
                priority
                className="hover:scale-110 transition-transform duration-300 hover:border-4 hover:border-primary hover:rounded-[3rem] drop-shadow-[0_15px_15px_rgba(18,186,170,0.24)]"
              />
            </a>
            <div className="col-span-2">
              <article className="prose lg:prose-2xl leading-6">{parse(body)}</article>
              <Link href={`/portfolio/${name.toLowerCase()}`}>
                <span className="flex items-center gap-2 text-2xl text-primary mt-8">
                  Learn why we invested
                  <IconCircleArrowRightFilled className="w-[1em] h-[1em] inline-block align-text-bottom" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const investments = [
  {
    name: "emo",
    link: "https://www.emoenergy.in/",
    body: (
      <p>
        EMO Energy is driving the <strong>net-zero future</strong> with <strong>advanced battery solutions</strong>, redefining efficiency for{" "}
        <strong>sustainable mobility</strong>. Their
        <strong>in-house, 100% safe battery packs</strong> and <strong>BMS</strong> are key to
        <strong> decarbonizing mobility</strong> and <strong>energy storage</strong>.
      </p>
    ),
    image: sq_emo,
  },
  {
    name: "matel",
    link: "https://matel.co.in/",
    body: (
      <p>
        MATEL develops advanced <strong>electric powertrain</strong> solutions for vehicles and industry, driven by its unique{" "}
        <strong>I Powertrain™ technology.</strong> The company focuses on <strong>energy efficiency</strong> and <strong>reliability</strong> to meet
        global sustainability goals."
      </p>
    ),
    image: sq_matel,
  },
  {
    name: "protonas",
    link: "https://protonas.tech/",
    body: (
      <p>
        Protonas is revolutionising the <strong>hydrogen economy</strong> with affordable <strong>fuel cell products.</strong> We're pioneering a
        cleaner future, starting in North America and expanding globally, with a seasoned team driving our cutting-edge technology.
      </p>
    ),
    image: sq_protonas,
  },
];

export default function InvestmentHighlightSections({data}) {
  console.log("the data on highlights section is", data)
  return (
    <>
      <div className="divide-y divide-[#ADE9E4]">
        {/* {investments.map((investment) => (
          <InvestmentCard key={investment.name} name={investment.name} link={investment.link} body={investment.body} image={investment.image} />
        ))} */}
          {data.map((investment) => (
          <InvestmentCard key={investment.name} name={investment.name} link={investment.link} body={investment.overview} image={investment.image} />
        ))}
      </div>
    </>
  );
}
