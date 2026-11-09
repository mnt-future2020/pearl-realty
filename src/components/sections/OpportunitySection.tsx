"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal";
import DarkSectionBackground, { DEEP_GRAPHITE } from "@/components/DarkSectionBackground";
import MagneticButton from "@/components/MagneticButton";
import Link from "next/link";

const opportunities = [
  {
    id: "global-wealth-migration",
    label: "MARKET FORCE 01",
    title: "Capital Re-domiciliation",
    stat: "0%",
    statLabel: "PERSONAL INCOME TAX",
    supportText: "WORLD’S MOST EFFICIENT TAX BASE AMONG MAJOR GLOBAL CITIES",
    description: "The global ultra-prime real estate market has undergone a fundamental structural shift since 2020, driven by global wealth migration toward stability and tax efficiency.",
    link: "/opportunity/global-wealth-migration",
    color: "from-blue-500/10"
  }
];

const OpportunitySection = () => {
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <div id="opportunity" ref={triggerRef} className="relative overflow-hidden bg-charcoal-deep text-white dark pt-24 md:pt-32 pb-12 md:pb-16" style={DEEP_GRAPHITE}>
      <DarkSectionBackground pattern="waves" />

      <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <ScrollReveal>
            <h3 className="font-display text-[10px] md:text-sm tracking-[0.8em] uppercase text-gold mb-4">Market Timing</h3>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white select-none leading-snug">
              Dubai. Now. <br className="md:hidden" /><span className="text-gradient-gold">The Only Window</span>
            </h2>
          </ScrollReveal>
        </div>

        {opportunities.map((opt, i) => (
          <div
            key={opt.id}
            className="w-full grid md:grid-cols-2 lg:grid-cols-[minmax(0,36rem)_auto] lg:justify-center gap-12 lg:gap-16 items-center"
          >
            {/* Left Content */}
            <div className="flex flex-col items-start text-left">
              <ScrollReveal>
                <span className="font-body text-[8px] tracking-[0.5em] uppercase text-champagne mb-6 block">
                  {opt.label}
                </span>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8">
                  {opt.title}
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <p className="font-body text-base md:text-xl text-white/70 max-w-xl mb-12 leading-relaxed">
                  {opt.description}
                </p>
              </ScrollReveal>

              {/* Explore Analysis Button - Desktop/Tablet Position */}
              <div className="hidden md:block">
                <ScrollReveal delay={600}>
                  <Link href={opt.link} scroll={true} onClick={() => window.scrollTo(0, 0)}>
                    <MagneticButton className="px-10 py-5 rounded-full">
                      Explore Analysis &rarr;
                    </MagneticButton>
                  </Link>
                </ScrollReveal>
              </div>
            </div>

            {/* Right Visualization */}
            <div className="relative flex flex-col justify-center items-center md:items-end">
              {/* Large Ambient Number */}
              <span className="absolute -top-20 -right-10 md:-right-20 font-display text-[30vw] md:text-[15vw] text-white/[0.03] select-none pointer-events-none">
                01
              </span>

              <div className="text-center md:text-right">
                <ScrollReveal delay={300}>
                  <div className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] text-gradient-gold mb-4">
                    {opt.stat}
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={500}>
                  <p className="font-body text-xs md:text-base tracking-[0.3em] uppercase text-champagne/60 mb-3">
                    {opt.statLabel}
                  </p>
                  {opt.supportText && (
                    <p className="font-body text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/30 max-w-[250px] md:max-w-none ml-auto">
                      {opt.supportText}
                    </p>
                  )}
                </ScrollReveal>

                {/* Explore Analysis Button - Mobile Position (at the end) */}
                <div className="mt-12 md:hidden flex justify-center">
                  <ScrollReveal delay={600}>
                    <Link href={opt.link} scroll={true} onClick={() => window.scrollTo(0, 0)}>
                      <MagneticButton className="px-10 py-5 rounded-full">
                        Explore Analysis &rarr;
                      </MagneticButton>
                    </Link>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dubai Skyline Sketch Background */}
      <div className="absolute bottom-0 left-0 w-full h-64 opacity-[0.03] pointer-events-none z-0">
        <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <path d="M0 200 L100 200 L100 150 L150 150 L150 100 L200 100 L200 200 L500 200 L500 50 L550 0 L600 50 L600 200 L1000 200 L1000 80 L1100 80 L1100 200 L2000 200 L2000 120 L2100 20 L2200 120 L2200 200 L3000 200 L3500 50 L3600 200 L4000 200" className="fill-none stroke-gold stroke-[0.5]" />
        </svg>
      </div>
    </div>
  );
};

export default OpportunitySection;
