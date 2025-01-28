'use client';
import React, { useState } from "react";
import Link from "next/link";
import FormPitchDeck from "./forms/FormPitchDeck";
import FormClickHere from "./forms/FormClickHere";
import FormGetInTouch from "./forms/FormGetInTouch";
import FormConversation from "./forms/FormConversation";
import FormContact from "./forms/FormContact";

const ContactUsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClickHereFormOpen, setIsClickHereFormOpen] = useState(false);
    const [isGetInTouchFormOpen, setIsGetInTouchFormOpen] = useState(false);
    const [isConversationFormOpen, setIsConversationFormOpen] = useState(false);
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);
    
  return (
    <div className="container mx-auto px-4 py-8 space-y-12 mb-20">
      <section className="space-y-4">
        <h2 className="tracking-[.6rem] text-[#5C5C5C] font-mono font-medium">
          FOUNDERS
        </h2>
        <div className="text-2xl/8">
          Ready to apply?{" "}
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-primary font-mono font-medium hover:underline"
          >
            Submit Pitch Deck&gt;
          </button>
          <br />
          Not ready to apply, but want to learn more about how Transition VC can help you?{" "}
          <button
            onClick={() => setIsClickHereFormOpen(true)}
            className="text-primary font-mono font-medium hover:underline"
          >
            Click here&gt;
          </button>
          <br /> connected?{" "}
          <button
            onClick={() => setIsGetInTouchFormOpen(true)}
            className="text-primary font-mono font-medium hover:underline"
          >Get in touch&gt;
            </button>
        </div>
      </section>
      <div className="divider divider-success"></div>
      <section className="space-y-4">
        <h2 className="tracking-[.6rem] text-[#5C5C5C] font-mono font-medium">INVEST</h2>
        <div className="text-2xl/8">
          Want to invest in Transition VC fund?{" "}
          <button
            onClick={() => setIsContactFormOpen(true)}
            className="text-primary font-mono font-medium hover:underline"
          >
            Click here&gt;
          </button>
          <br />
          Learn more about investing in Transition VC Portfolio Companies{" "}
          <Link
            href="/portfolio"
            className="text-primary font-mono font-medium hover:underline"
          >
            here&gt;
          </Link>
        </div>
      </section>
      <div className="divider divider-success"></div>
      <section className="space-y-4">
        <h2 className="tracking-[.6rem] text-[#5C5C5C] font-mono font-medium">
          CORPORATE AND CVC PARTNERS
        </h2>
        <p className="text-2xl/8">
          Contact us to learn about Transition VC Partnerships{" "}
          <button
            onClick={() => setIsConversationFormOpen(true)}
            className="text-primary font-mono font-medium hover:underline"
          >
            here&gt;
          </button>
        </p>
      </section>
      <div className="divider divider-success"></div>
      <section className="space-y-4">
        <h2 className="tracking-[.6rem] text-[#5C5C5C] font-mono font-medium">
          CAN'T FIND WHAT YOU'RE LOOKING FOR?
        </h2>
        <p className="text-2xl/8">
          No problem, we're here to help you, just shoot us an email:{" "}
          <a
            href="mailto:info@transitionventurecapital.com"
            className="text-primary font-mono font-medium underline"
          >
            info@transitionventurecapital.com
          </a>
        </p>
      </section>
      <FormPitchDeck isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <FormClickHere isOpen={isClickHereFormOpen} onClose={() => setIsClickHereFormOpen(false)} />
      <FormGetInTouch isOpen={isGetInTouchFormOpen} onClose={() => setIsGetInTouchFormOpen(false)} />
      <FormConversation isOpen={isConversationFormOpen} onClose={() => setIsConversationFormOpen(false)} />
      <FormContact isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </div>
  );
};

export default ContactUsSection;
