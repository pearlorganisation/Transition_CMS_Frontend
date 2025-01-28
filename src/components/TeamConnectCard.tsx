import React from "react";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";

const ConnectWithUs = () => {
  return (
    <div className=" flex  flex-col  justify-around h-full">
      <h2 className="font-mono text-[1.8rem] font-semibold mb-4">Connect with Us</h2>

      <div className="flex space-x-4  ">
        <Link
          href="https://www.linkedin.com/company/transition-vc/?viewAsMember=true"
          className="btn btn-lg btn-circle bg-white text-secondary"
          aria-label="linkedin"
          target="_blank"
        >
          <FaLinkedin className="fill-black w-[1.8rem] h-[1.8rem]" />
        </Link>
        <Link
          href="https://www.youtube.com/@TransitionVC1"
          className="btn btn-circle btn-lg bg-white text-secondary"
          aria-label="youtube"
          target="_blank"
        >
          <IconBrandYoutubeFilled className="fill-black  w-[2.1rem] h-[2.1rem]" />
        </Link>
      </div>

      {/* <p className="text-[1.25rem]/[1.6rem] font-medium"> */}
      <h2 className="text-[1.6rem]/[2.4rem] font-medium">
        Meet our visionary expert whose stewardship drives the change-makers making a significant impact in the energy transition space. At Transition
        VC, our team stands at the forefront, guiding breakthroughs and setting new standards in the industry.
        {/* </p> */}
      </h2>
    </div>
  );
};

export default ConnectWithUs;
