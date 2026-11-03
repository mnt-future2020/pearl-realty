"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import ContactForm from "@/components/ContactForm";
import ContactInfoWall from "@/components/ContactInfoWall";

const ContactSection = () => {
  return (
    <section id="contact" className="relative pt-6 md:pt-8 pb-24 md:pb-32 bg-[#F8F7F4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative">
          <ContactForm />
        </div>

        <ScrollReveal className="mt-16 md:mt-24">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-24 lg:items-end mb-10 md:mb-14">
            <div>
              <span className="font-body text-xs tracking-[0.4em] uppercase text-gold font-semibold mb-6 block">
                Get In Touch
              </span>
              <h2 className="font-display text-5xl md:text-7xl font-light leading-tight">
                Secure Your <br /><span className="text-gold">Next Move.</span>
              </h2>
            </div>
            <p className="font-body text-lg text-charcoal/60 max-w-md leading-relaxed lg:pb-3">
              Discrete advisory for the world's most sophisticated investors. Request a private briefing or asset tour today.
            </p>
          </div>
        </ScrollReveal>

        <ContactInfoWall />
      </div>
    </section>
  );
};

export default ContactSection;
