import React from "react";
import Image from "next/image";
import Link from "next/link";
import img_team from "../../public/img/team_landing.png";

export default function TeamLanding() {
  return (
    <section className=" min-h-[45vh] py-5 container mx-auto flex flex-col bg-accent">
      <div className=" h-max max-w-screen-2xl sm:py-16 lg:px-6 py-8 px-4  grow content-center">
        <div className="grid grid-flow-row md:grid-flow-col grid-cols-10  ">
          <div className="col-span-10 md:col-span-6 grid grid-flow-row grid-cols-1 sm:py-16 py-8 px-8">
            <h3 className="tracking-[.6rem] text-[#5C5C5C] font-medium ">TEAM</h3>
            <article className="mt-8">
              <p className="text-xl md:text-[2rem]/[3rem]  font-normal">
                Our team leverages deep domain expertise
                <br />
                and key industry connections to drive
                <br />
                deeptech innovations at scale.
              </p>
            </article>
            <div>
              <Link href="/team">
                <button
                  //   onClick={() => (window.location.href = "/team")}
                  className="btn btn-secondary md:btn-lg mt-8 text-black bottom-0"
                >
                  Know More
                </button>
              </Link>
            </div>
          </div>
          <div className="col-span-10 md:col-span-4 object-contain">
            <Image
              src={img_team}
              className="w-full "
              alt="Transition VC Team"
              width={520}
              height={520}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
