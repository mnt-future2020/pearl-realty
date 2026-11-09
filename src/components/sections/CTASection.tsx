import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import DarkSectionBackground, { DEEP_GRAPHITE } from "@/components/DarkSectionBackground";

import MagneticButton from "@/components/MagneticButton";

// --- Custom Phone UI Overlay ---
// const PhoneUI = () => {
//   return (
//     <div className="w-full h-full bg-[#050505] p-4 flex flex-col font-body text-white">
//       Top Bar / Logo
//       <div className="flex justify-between items-center mb-6">
//         <div className="text-[10px] tracking-[0.4em] uppercase font-light text-champagne">Pearl</div>
//         <div className="w-4 h-4 rounded-full border border-champagne/30" />
//       </div>

//       Advisor Info
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-10 h-10 rounded-full border border-champagne/20 overflow-hidden bg-white/5">
//           <div className="w-full h-full flex items-center justify-center text-[10px] text-champagne font-display">RL</div>
//         </div>
//         <div>
//           <div className="text-[10px] font-semibold text-white/90">Raghunath Lakshmanan</div>
//           <div className="text-[8px] text-muted-foreground/60 uppercase tracking-widest mt-0.5">Senior Advisor</div>
//         </div>
//       </div>

//       Booking Header
//       <div className="text-xs font-light mb-4">Request Consultation</div>

//       Time Slots
//       <div className="grid grid-cols-2 gap-2 mb-8">
//         {["10:00 AM", "02:30 PM", "04:00 PM", "Private"].map((time, i) => (
//           <div key={i} className={`p-2 rounded-lg border text-[9px] text-center ${i === 1 ? "border-champagne bg-champagne/10 text-champagne" : "border-white/5 text-white/40"}`}>
//             {time}
//           </div>
//         ))}
//       </div>

//       Phone CTA
//       <div className="mt-auto pb-4">
//         <div className="w-full py-3 bg-champagne rounded-lg text-background text-[10px] font-bold text-center tracking-widest uppercase">
//           Confirm Access
//         </div>
//         <div className="text-center text-[7px] text-white/30 mt-3 tracking-widest uppercase">discreet · secure · instant</div>
//       </div>
//     </div>
//   );
// };

// --- Main CTA Section ---
const CTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // --- Client-side random values to prevent hydration mismatch ---
  const [particles, setParticles] = useState<{ left: string; top: string; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 6 + Math.random() * 6,
      delay: Math.random() * 6,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        className="relative flex flex-col items-center overflow-hidden pt-10 md:pt-20 pb-0 bg-charcoal-deep dark"
        style={DEEP_GRAPHITE}
      >
        <DarkSectionBackground pattern="skyline" />

        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Centered Deep Gold Glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-champagne/15 rounded-full blur-[180px] opacity-40" />
          {/* Gold accent top line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />

          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            {particles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute w-[1px] h-[100px] bg-gradient-to-b from-transparent via-champagne/20 to-transparent"
                style={{
                  left: p.left,
                  top: p.top,
                  rotate: 25,
                }}
                animate={{
                  y: [0, 600],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: p.delay
                }}
              />
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-30 flex flex-col items-center text-center">

          {/* Center Content */}
          <motion.div style={{ y: textY }} className="flex flex-col items-center mb-0 relative z-40">
            <ScrollReveal>
              <span className="font-body text-xs tracking-[0.6em] uppercase text-champagne/60 inline-block mb-10">
                The Circle of Discretion
              </span>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h2 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-7xl font-light leading-[1.2] md:leading-[1] text-foreground mb-6 md:mb-10">
                Your Next Move, <br className="hidden md:block" />
                <span className="text-gradient-gold">Handled Privately</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={400}>
              <p className="font-body text-sm md:text-xl text-foreground max-w-2xl mb-10 md:mb-14 leading-relaxed font-light px-4">
                Secure landmark assets with the silence and strategic foresight your legacy deserves. The unseen market awaits your command.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={600}>
              <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 relative z-50">
                <MagneticButton className="rounded-full w-full sm:w-auto" primary onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Book Private Consultation</MagneticButton>
                <MagneticButton className="rounded-full w-full sm:w-auto" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>Explore Pillars</MagneticButton>
              </div>
            </ScrollReveal>
          </motion.div>

          {/* Hero: The Interactive Phone (Centered Bottom) */}
          <motion.div
            style={{ y: phoneY }}
            className="relative w-full flex justify-center items-start -mt-10 md:-mt-20 -mb-40 md:-mb-60 pointer-events-none"
          >
            <motion.div
              className="relative w-[280px] h-[560px] md:w-[480px] md:h-[960px]"
              animate={{
                y: [0, -20, 0],
                rotate: [-0.5, 0.5, -0.5]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <img
                src="/cta/cta.png"
                alt="Pearl Realty Private Access"
                className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_50px_rgba(193,155,108,0.15)]"
              />

              {/* Cinematic Smoke Fade Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 z-20" style={{ background: "linear-gradient(to top, hsl(var(--charcoal-deep)), hsla(var(--charcoal-deep) / 0.8), transparent)" }} />

              {/* Additional soft blur layer for smoke feel */}
              <div className="absolute inset-x-0 -bottom-10 h-32 blur-1xl opacity-10 z-10" style={{ background: "hsl(var(--charcoal-deep))" }} />
            </motion.div>
          </motion.div>
        </div>

        {/* Focal Depth Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] max-h-[500px] rounded-full border border-champagne/10 blur-[1px] -z-10" />
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default CTASection;
