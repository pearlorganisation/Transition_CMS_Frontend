"use client"
import React, { useEffect, useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { FaLinkedin } from "react-icons/fa";
import ConnectWithUs from "@/components/TeamConnectCard";
import { getAllTeamMembers } from "../../lib/database/action/teamAction"
// import t_1 from "../../../public/img/team/team-1.png";

// function importAll(r: __WebpackModuleApi.RequireContext) {
//     let images = {};
//     r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//     return images;
// }

// const images = importAll(require.context('/img', false, '/\.jpg/'));

// <img src={images["img1.png"]} />

const members = {
  executive_team: [
    {
      id: 1,
      name: "Raiyaan Shingati",
      bio: "Co-founder & Managing Partner",
      link: "https://www.linkedin.com/in/raiyaan-shingati-02099077/",
    },
    {
      id: 2,
      name: "Mohammed Shoeb Ali",
      bio: "Co-founder & Managing Partner",
      link: "https://www.linkedin.com/in/mohammed-shoeb-ali-1a814a184/",
    },
    {
      id: 3,
      name: "Shantanu Chaturvedi",
      bio: "Vice President",
      link: "https://www.linkedin.com/in/shantanu-chaturvedi-vc/",
    },
    {
      id: 4,
      name: "Gaurav Patil",
      bio: "Associate Vice President",
      link: "https://www.linkedin.com/in/gauravpatil03/",
    },
    {
      id: 5,
      name: "Stenson Sajee",
      bio: "Investor Relations Manager",
      link: "https://www.linkedin.com/in/stenson-sajee/",
    },
    {
      id: 6,
      name: "Abhinaya Venkatesh",
      bio: "Operations Associate",
      link: "https://www.linkedin.com/in/abhinaya-venkatesh2310/",
    },
    {
      id: 7,
      name: "Himanshi Ghai",
      bio: "Visual Experience Designer",
      link: "https://www.linkedin.com/in/himanshi-ghai-754691163/",
    },
    {
      id: 8,
      name: "Parth Saxena",
      bio: "Analyst",
      link: "https://www.linkedin.com/in/parth-saxena/",
    },
    {
      id: 9,
      name: "Prachi Goyal",
      bio: "Analyst",
      link: "https://www.linkedin.com/in/prachigoyal2908/",
    },
    {
      id: 10,
      name: "Keshav Verma",
      bio: "Founder's Office Intern",
      link: "https://www.linkedin.com/in/keshav-verma-2a5456188/",
    },

    {
      id: 11,
      name: "Bhavya Anand",
      bio: "Operations Intern",
      link: "https://www.linkedin.com/in/bhavya-anand-0a2aa4147/",
    },
  ],
  general_partners: [
    {
      id: 12,
      name: "Mustafa Wajid",
      bio: "Investment Committee Member",
      link: "https://www.linkedin.com/in/mustafa-wajid-05075345/",
    },
    {
      id: 13,
      name: "Tejas Goenka",
      bio: "Investment Committee Member",
      link: "https://www.linkedin.com/in/tejas-goenka-3ab25244/",
    },
    {
      id: 14,
      name: "Rajesh Doshi",
      bio: "Investment Committee Member",
      link: "https://www.linkedin.com/in/rd-5477a938/",
    },
    {
      id: 15,
      name: "Anuj Khanna",
      bio: "Investment Committee Member",
      link: "https://www.linkedin.com/in/anuj-khanna-1a040a22/",
    },
    {
      id: 16,
      name: "Ravin Mirchandani",
      bio: "Investment Committee Member",
      link: "https://www.linkedin.com/in/ravinmirchandani/",
    },
  ],
  experts: [
    {
      id: 17,
      name: "Naresh V Narasimha",
      bio: "Senior Expert & Advisor",
      link: "https://www.linkedin.com/in/naresh-v-narasimhan-3324521/",
    },
    {
      id: 18,
      name: "Saif Qureishi",
      bio: "Senior Expert & Advisor",
      link: "https://www.linkedin.com/in/saif-qureishi-b293a4a/",
    },
    {
      id: 19,
      name: "Dr. Arvind Parthasarathy",
      bio: "Senior Expert & Advisor",
      link: "https://www.linkedin.com/in/arvind-parthasarathy-0338b711/",
    },
    {
      id: 20,
      name: "Dr. Ingolf Gröning",
      bio: "Senior Expert & Advisor",
      link: "https://www.linkedin.com/in/ingolf-gr%C3%B6ning-3396905/",
    },
  ],
};

interface Member {
  _id:string;
  name: string;
  bio: string;
  link: string;
  image:{secure_url: string}
  type:string;

}

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <a href={member.link} target="_blank" rel="noreferrer" className="block relative group">
      <div className="card bg-base-100  shadow-xl overflow-hidden">
        <figure>
          <Image src={member?.image?.secure_url} alt={member.name} layout="responsive" width={384} height={256} />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-nowrap">{member.name}</h2>
          <p>{member.bio}</p>
        </div>
        <div className="absolute inset-0 bg-secondary bg-opacity-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white rounded-full p-4">
            <FaLinkedin className="text-secondary text-4xl" />
          </div>
        </div>
      </div>
    </a>
  );
};

export default function TeamGallery() {
  const [teamsData, setTeamsData] = useState<Member[]>([])
  useEffect(()=>{
   const fetchTeams = async()=>{
     
      const res = await getAllTeamMembers()
      setTeamsData(res.data);
    }  
    fetchTeams()
  },[])
  const executiveTeam = useMemo(() => teamsData.filter(member => member.type === "executive_team"), [teamsData]);
  const generalPartners = useMemo(() => teamsData.filter(member => member.type === "general_partners"), [teamsData]);
  const experts = useMemo(() => teamsData.filter(member => member.type === "experts"), [teamsData]);
  console.log("all the filtered data is", executiveTeam, generalPartners, experts)
  // console.log("the teams data is", teamsData)
  return (
    <section className="min-h-[45vh] py-5 flex flex-col">
      <div className=" h-max container mx-auto grow ">
        <h1 className="font-mono font-medium text-[2.5rem] my-14">Executive Team</h1>

        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-4 place-content-center gap-12 ">
          {/*  </div> */}
          {executiveTeam.map((member: Member, idx) => (
            <>
              {idx === 2 && (
                <div key={member._id} className="md:col-span-2 card w-full  bg-cyan-100 rounded-lg p-6">
                  <ConnectWithUs />
                </div>
              )}
              <MemberCard key={member.name} member={member} />
            </>
          ))}
        </div>
      </div>
      <div className="divider"></div>
      <div className=" h-max container mx-auto grow ">
        <h1 className="font-mono font-medium text-[2.5rem] my-14">Investment Committee</h1>
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-4 place-content-center gap-12 ">
          {generalPartners.map((member: Member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
      <div className="divider"></div>
      <div className=" h-max container mx-auto grow ">
        <h1 className="font-mono font-medium text-[2.5rem] my-14">Sector Experts & Advisors</h1>
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-4 place-content-center gap-12 ">
          {experts.map((member: Member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
