import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import img_podcast from "../../public/img/insight/podcast.png";
import { backendBaseUrl } from "./utils/backendUrl";
import { getAllPodcasts } from "@/lib/database/action/insightsAction";

const PodcastListing = () => {
  const podcastData = [
    {
      id:1,
      title: "Charging Into Tomorrow: EMO Energy's Game changing Battery Packs",
      description:
        "Join us as we explore the future of energy transition and the revolutionary impact these advancements are poised to have on various industries.",
      link: "https://www.youtube.com/watch?v=PeVGuRDq5Gs&t=3515s",
    },
  ];
   const [podcasts, setPodcasts] = useState([])
    const plen = podcasts.length;

  useEffect(()=>{
    const fetchPodcasts =async()=>{
      try {
        const res = await getAllPodcasts()
        setPodcasts(res.data)
      } catch (error) {
        console.log("the error is", error);
        throw error
      }
    }
    fetchPodcasts() 
  },[])

  console.log("the podcasts data is", podcasts)
  return (
    <div className="container mx-auto p-4">
      {/* <div className="prose">
        <h3 className="text-xl lg:text-3xl text-wrap font-normal mb-6">Podcast</h3>
        </div> */}
      <div className="prose text-xl lg:text-3xl text-wrap">
        <h3 className="font-normal">Podcast</h3>
      </div>
      <div className="space-y-6">
       
         {podcasts?.map((podcast, index) => (
          
            <div key={podcast?._id}>
              <div className="grid grid-cols-10 p-4 rounded-lg">
                {/* <div className="w-24 h-24 bg-black rounded-lg flex items-center justify-center flex-shrink-0"> */}
                <a href={podcast?.link} target="_blank" rel="noopener noreferrer" className="col-span-10 md:col-span-2 cursor-pointer">
                  <Image
                    src={podcast?.image?.secure_url}
                    width={200}
                    height={100}
                    alt="Podcast"
                    className="max-w-[200px] max-h-[150px] col-span-6 md:col-span-2 p-[1rem]"
/>                </a>
                {/* </div> */}
                <div className="col-span-10 md:col-span-8 self-center">
                  <h2 className="text-xl font-semibold mb-2">{podcast?.title}</h2>
                  <p className="text-base-content text-opacity-70 mb-4">{podcast?.description}</p>
                  <a href={podcast?.link} target="_blank" rel="noopener noreferrer" className="inline-block">
                    <button className="btn btn-outline rounded-3xl ">
                      Watch on Youtube
                      <IconBrandYoutubeFilled fill="#FF0000" />
                    </button>
                  </a>
                </div>
              </div>
              {index < plen - 1 && <div className="divider"></div>}
            </div>
           
        ))}
      </div>
    </div>
  );
};

export default PodcastListing;
