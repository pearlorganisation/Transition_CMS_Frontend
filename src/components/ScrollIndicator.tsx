import React from "react";
import { FaChevronDown, FaArrowCircleDown } from "react-icons/fa";

const ScrollIndicator = ({ href = "" }) => {
  const handleClick = (e: any) => {
    e.preventDefault();

    if (href !== "") {
      const target = document.querySelector(href);
      target && target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: window.innerHeight-140, left: 0, behavior: "smooth" });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="flex flex-col items-center text-gray-600 no-underline hover:text-gray-800 transition-colors duration-300"
    >
      <p className="text-sm mb-2">Scroll for more information</p>
      <FaArrowCircleDown size={24} className="animate-bounce" />
    </a>
  );
};

export default ScrollIndicator;
