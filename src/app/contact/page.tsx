'use client';
import React, { useEffect, useState } from "react";
import AbstractHero from "@/components/AbstractHero";
import ContactUsSection from "../../components/ContactUsSection";
import FormContact from "../../components/forms/FormContact";
import { PiWechatLogoFill, PiQuotesFill } from "react-icons/pi";
import bg_contact from "../../../public/img/bg-contact.png";
import { backendBaseUrl } from "@/components/utils/backendUrl";


export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isError, setIsError]= useState(false);
  const [contactData, setContactData] = useState<any>(null);

  useEffect(()=>{
     const fetchContact = async()=>{
          try {
            setLoading(true);
            setIsError(false) 
            const res = await fetch(`${backendBaseUrl}/contact-us-page`);
            const data = await res.json()
            setContactData(data.data)
          } catch (error) {
            setIsError(true)
            throw error
          }finally{
            setLoading(false)
          }
        }
        fetchContact()
  },[])
console.log("the contact data is", contactData)
    const content = `
    <div>
      Are you an aspiring entrepreneur, early-stage startup founder, investor, potential
      partner or mentor?
    </div>
  `

  return (
    <>
    <AbstractHero content={content} bg={bg_contact.src} />
       
      <section className="min-h-[45vh] py-5 container mx-auto flex flex-col mb-20">
        <div className="py-8 px-4 mx-auto w-[80%] sm:py-16 lg:px-6 grow rounded-lg content-center bg-accent justify-center text-center ">
          <div className="max-w-4xl z-10 flex flex-col justify-center items-center mx-auto">
            <div className="bg-base-100 text-[2rem] rounded-2xl p-[2rem] m-[1rem] shadow-md aspect-square flex ">
              <PiWechatLogoFill className="w-[1em] h-[1em] justify-center align-text-center text-primary" />
            </div>
          </div>
          <article className="prose mx-auto max-w-[45rem] text-2xl text-black">
          <h1 className="text-4xl font-mono font-medium">Contact Us</h1>
            <p>
            Are you an aspiring entrepreneur, early-stage startup founder, investor,
            potential partner or mentor? Learn the different ways to join the Transition
            VC and connect with us!
          
          </p> 
          </article>
          <button onClick={() => setShowForm(true)} className="btn btn-secondary btn-wide btn-lg mt-8 font-mono text-black text-2xl text-nowrap">Connect with us !!!</button>
        </div>
      </section>
        {contactData && <ContactUsSection data={contactData} /> }  
      <FormContact isOpen={showForm} onClose={() => setShowForm(false)} />
    </>
  );
}
