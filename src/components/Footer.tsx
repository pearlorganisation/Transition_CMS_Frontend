import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/img/logo.png";
import { IconBrandYoutubeFilled, IconCircleArrowRightFilled } from "@tabler/icons-react";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <div className="divide-y min-h-[45vh]">
        <footer className="footer bg-accent text-base-content p-10 pr-4 min-h-[40vh] grid grid-flow-row md:grid-flow-col grid-cols-10">
          <div className="col-span-10 md:col-span-7 grid grid-flow-row h-full">
            <aside>
              <Image className="dark:invert" src={logo} alt="Transition VC logo" width={180} height={38} priority />
            </aside>
            <div className="justify-self-end flex flex-col  h-full items-start text-start">
              <h2 className="text-xl md:text-[1.5rem]/[2rem] font-normal mt-8 text-[#828282]">Got a Project in Mind?</h2>

              <Link href="/contact" className="text-[3.5rem]/[4rem] md:text-[6.25rem]/[6rem] font-mono font-light">
                <span className="flex items-center md:gap-2">
                  {" "}
                  <p>Get In Touch</p>
                  <IconCircleArrowRightFilled className="w-[1em] h-[1em] fill-primary inline-block align-text-bottom hover:animate-bounce transition-transform duration-100" />
                </span>
              </Link>
            </div>
          </div>
          <div className="col-span-10 md:col-span-3 w-full h-full pb-10">
            <div>
              <h3 className="text-xl font-mono font-semibold mb-4">Connect</h3>
              <a href="mailto:info@transitionventurecapital.com" className="text-base mb-4">
                info@transitionventurecapital.com
              </a>
              <div className="flex space-x-4 mt-5">
                <Link
                  href="https://www.linkedin.com/company/transition-vc/?viewAsMember=true"
                  className="btn btn-circle btn-secondary text-secondary"
                  aria-label="linkedin"
                  target="_blank"
                >
                  <FaLinkedin className="fill-primary w-[1.125rem] h-[1.125rem]" />
                </Link>
                <Link
                  href="https://www.youtube.com/@TransitionVC1"
                  className="btn btn-circle btn-secondary text-secondary"
                  aria-label="youtube"
                  target="_blank"
                >
                  <IconBrandYoutubeFilled className="fill-primary  h-[1.5rem]" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-mono font-semibold mb-4 mt-12">Office</h3>
              <p className="text-base mb-4">
                2nd Floor, Building II B, AMR Tech
                <br />
                Park, Hosur Main Road, Bengaluru,
                <br />
                Karnataka - 560068
              </p>
            </div>
          </div>
        </footer>
        {/* <div className="divider"></div> */}
        <footer className="footer bg-accent text-base-content p-4 md:px-12 px-4 text-center">
          <nav className="grid grid-flow-col md:gap-12 gap-4">
            <p>© {new Date().getFullYear()} - TransitionVC</p>
            <Link href="#" className="link link-hover">
              FAQs
            </Link>
            <Link href="#" className="link link-hover">
              Privacy Policy
            </Link>
            <Link href="#" className="link link-hover">
              Terms and Conditions
            </Link>
          </nav>
        </footer>
      </div>
    </>
  );
}
