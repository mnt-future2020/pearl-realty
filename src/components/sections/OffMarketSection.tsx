"use client";

import React from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import DarkSectionBackground, { DEEP_GRAPHITE } from "@/components/DarkSectionBackground";
import MagneticButton from "@/components/MagneticButton";
import { CheckCircle2 } from "lucide-react";

// --- Data Models ---

const advisoryTier = {
  id: "01",
  name: "Pearl Advisory",
  subtitle: "A comprehensive fiduciary mandate for high-conviction portfolios and dynastic wealth preservation.",
  featureGroups: [
    {
      title: "Acquisition & Execution",
      items: [
        "Off-market asset sourcing",
        "Strategic asset presentation",
        "Negotiation & deal structuring",
        "Transaction management",
        "VR property visualization",
        "Legal & jurisdictional handoff",
      ]
    },
    {
      title: "Portfolio Intelligence",
      items: [
        "Market intelligence briefings",
        "Quarterly performance reviews",
        "Hospitality yield optimization",
        "Priority deal pipeline access",
        "Golden Visa orchestration",
        "Institutional network access",
      ]
    },
    {
      title: "Legacy & Governance",
      items: [
        "Estate & succession structuring",
        "Multi-generational planning",
        "Family council advisory",
        "Heir advisory strategy",
        "Annual legacy audit",
      ]
    }
  ],
  pricing: "1.5% – 2.0% + $50k Annual",
  dealSize: "12 months",
  relationship: "Long-term advisory",
  target: "Family Offices / Royal Families / Post-Exit Founders",
};

export default function OffMarketSection() {
  // Variants for staggered checklist animation
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="off-market"
      className="relative bg-charcoal-deep text-white py-24 md:py-32 overflow-hidden dark"
      style={DEEP_GRAPHITE}
    >
      <DarkSectionBackground pattern="lattice" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <ScrollReveal>
            <span className="font-body text-xs tracking-[0.4em] uppercase text-gold font-semibold flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-[#C7A56A]/50"></span>
              Exclusive Access
              <span className="w-12 h-px bg-[#C7A56A]/50"></span>
            </span>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h2 className="mt-8 font-display text-5xl md:text-7xl font-light leading-tight">
              Off Market.<br />
              <span className="text-gold">By Invitation Only.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <p className="mt-8 font-body text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
              The most valuable opportunities are rarely advertised. They are privately introduced.
            </p>
          </ScrollReveal>
        </div>

        {/* Unified Private Service Card */}
        <ScrollReveal delay={500}>
          <div className="group relative p-[1px] rounded-3xl overflow-hidden bg-gradient-to-r from-[#C7A56A]/40 via-[#C7A56A]/10 to-[#C7A56A]/40 shadow-2xl transition-all duration-700">
            <div className="relative bg-charcoal-deep rounded-3xl p-8 md:p-16 bg-gradient-to-br from-white/[0.05] to-white/[0.02]">
              <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

                {/* Left: Identity & Core Details */}
                <div className="lg:w-1/3 space-y-10">
                  <div>
                    <span className="text-[#C7A56A]/60 font-mono text-sm tracking-widest uppercase">Mandate 01</span>
                    <h3 className="font-display text-4xl md:text-5xl text-white mt-4 mb-6">{advisoryTier.name}</h3>
                    <p className="text-white/50 text-base md:text-lg leading-relaxed font-light">{advisoryTier.subtitle}</p>
                  </div>

                  <div className="pt-10 border-t border-white/5 space-y-8">
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 font-bold">Fee Structure</span>
                      <span className="font-display text-2xl text-white">{advisoryTier.pricing}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 font-bold">Target Profile</span>
                      <span className="text-white/80 text-sm tracking-wide font-medium">{advisoryTier.target}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-12 gap-y-6">
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 font-bold">Minimum Term</span>
                        <span className="text-white/80 text-sm font-medium">{advisoryTier.dealSize}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 font-bold">Relationship</span>
                        <span className="text-gold text-sm font-bold tracking-wide">{advisoryTier.relationship}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Feature Ecosystem (3 Columns) */}
                <div className="lg:w-2/3">
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16">
                    {advisoryTier.featureGroups.map((group, groupIdx) => (
                      <div key={groupIdx} className="space-y-8">
                        <h4 className="font-display text-xs uppercase tracking-[0.4em] text-gold font-bold pb-4 border-b border-white/5">
                          {group.title}
                        </h4>
                        <motion.ul
                          variants={listVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          className="space-y-5"
                        >
                          {group.items.map((item, itemIdx) => (
                            <motion.li
                              key={itemIdx}
                              variants={itemVariants}
                              className="flex items-start gap-4 group/item"
                            >
                              <div className="mt-1">
                                <CheckCircle2 className="w-4 h-4 text-[#C7A56A] group-hover/item:scale-110 transition-transform duration-300" />
                              </div>
                              <span className="text-white/60 text-sm leading-relaxed font-light group-hover/item:text-white transition-colors duration-300">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA Strip */}
        <ScrollReveal>
          <div className="relative z-10 mt-20 flex flex-col sm:flex-row items-center justify-center gap-6">
            <MagneticButton
              primary
              className="rounded-full px-12"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book Consultation
            </MagneticButton>
          </div>
        </ScrollReveal>

      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            left: 100%;
          }
        }
      `}</style>
    </section>
  );
}
