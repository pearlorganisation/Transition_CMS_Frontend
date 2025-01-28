import React from "react";

const NewsletterSubscription = () => {
  return (
    <>
      <div className="relative px-4 py-16 min-h-[45vh] grid  content-start justify-center quote-grid">
        <div className="absolute inset-0 bg-radial-glow "></div>
        <div className="w-full p-8 rounded-lg z-10">
          <h1 className="text-[4rem] font-bold text-center mb-8">Subscribe to our newsletter</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your Email"
              className="input input-bordered grow bg-accent border-secondary focus:border-secondary focus:outline-secondary"
            />
            <button className="btn btn-secondary  btn-xs sm:btn-sm md:btn-md lg:btn-md text-black min-h-[3rem]">Subscribe Now !!!</button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .quote-grid {
          background-image: linear-gradient(to right, #f2f3f5 1px, transparent 1px), linear-gradient(to bottom, #f2f3f5 1px, transparent 1px);
          background-size: 100px 100px;
        }
      `}</style>
    </>
  );
};

export default NewsletterSubscription;
