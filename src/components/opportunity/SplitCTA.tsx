"use client";

import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface SplitCTAProps {
  label?: string;
  headline: string;
  subtext?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  theme?: "dark" | "light";
}

export default function SplitCTA({
  label = "Private Intelligence",
  headline,
  subtext = "Access off-market landmark opportunities reserved for qualified investors.",
  primaryLabel = "Access Private Opportunities",
  secondaryLabel = "Request Market Intelligence",
  theme = "dark",
}: SplitCTAProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isLight = theme === "light";

  const handleNavigation = (id: string) => {
    if (pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        // Calculate offset for fixed header
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      // Navigate to homepage with query param to avoid native hash jump flicker
      router.push(`/?scrollTo=${id}`, { scroll: false });
    }
  };

  return (
    <section className={`${isLight ? "py-6" : "py-12"} px-4`}>
      <ScrollReveal>
        <div className={`relative overflow-hidden ${isLight ? "" : "rounded-[2.5rem] border border-white/8 bg-[#0A0A0A] shadow-2xl transition-colors duration-500"}`}>
          {/* Gradient glow background */}
          {!isLight && (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(199,165,106,0.1)_0%,transparent_60%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(199,165,106,0.05)_0%,transparent_50%)]" />
            </>
          )}

          {/* Top accent line */}
          <div className={`absolute top-0 left-0 right-0 h-px ${isLight ? "bg-gradient-to-r from-transparent via-[#C7A56A]/20 to-transparent" : "bg-gradient-to-r from-transparent via-[#C7A56A]/40 to-transparent"}`} />

          {/* Subtle grid */}
          {!isLight && (
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: "linear-gradient(rgba(199,165,106,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(199,165,106,0.8) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          )}

          {/* Corner bracket TL */}
          <div className={`absolute top-0 left-0 md:top-4 md:left-4 w-6 h-6 border-t border-l ${isLight ? "border-gold/30" : "border-[#C7A56A]/25"}`} />
          {/* Corner bracket BR */}
          <div className={`absolute bottom-0 right-0 md:bottom-4 md:right-4 w-6 h-6 border-b border-r ${isLight ? "border-gold/30" : "border-[#C7A56A]/25"}`} />

          {/* Split layout */}
          <div className={`relative z-10 grid md:grid-cols-2 ${isLight ? "py-4 md:py-6" : ""}`}>
            {/* LEFT — Headline block */}
            <div className={`${isLight ? "p-4 md:p-6" : "p-10 md:p-16"} flex flex-col justify-center`}>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-body text-[10px] tracking-[0.6em] uppercase text-gold mb-6 block font-bold"
              >
                {label}
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`font-display text-3xl md:text-4xl lg:text-5xl font-light leading-tight ${isLight ? "text-charcoal" : "text-white"} mb-6`}
              >
                {headline.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className={`font-body ${isLight ? "text-charcoal/50" : "text-white/50"} text-sm md:text-base leading-relaxed font-light max-w-sm`}
              >
                {subtext}
              </motion.p>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mt-10 h-px w-24 bg-gradient-to-r from-gold to-transparent origin-left"
              />
            </div>

            {/* RIGHT — CTA block */}
            <div className={`${isLight ? "py-4 px-0 md:p-6" : "p-5 md:p-10"} flex flex-col justify-center items-start md:items-center gap-6`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full max-sm:max-w-[280px] max-sm:mx-auto md:max-w-xs"
              >
                {/* Primary button */}
                <button
                  onClick={() => handleNavigation("services")}
                  className={`group relative w-full flex items-center justify-center gap-3 bg-gold max-sm:h-12 max-sm:!px-2 max-sm:py-0 max-sm:whitespace-nowrap max-sm:tracking-[0.1em] max-sm:gap-2 ${isLight ? "text-[#0A0A0A]" : "text-[#0A0A0A]"} font-body text-[10px] tracking-[0.25em] uppercase font-bold px-3 py-4 rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_24px_rgba(199,165,106,0.4)] mb-2`}
                >
                  {/* Shimmer */}
                  <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                  <span className="relative z-10">{primaryLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 max-[359px]:hidden relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                {/* Secondary button */}
                <button
                  onClick={() => handleNavigation("contact")}
                  className={`group w-full flex items-center justify-center gap-3 border max-sm:h-12 max-sm:!px-2 max-sm:py-0 max-sm:whitespace-nowrap max-sm:tracking-[0.1em] max-sm:gap-2 ${isLight ? "border-charcoal/10 text-charcoal/60" : "border-white/15 text-white/70"} hover:text-gold hover:border-gold/50 font-body text-[10px] tracking-[0.25em] uppercase font-semibold px-5 py-4 rounded-full transition-all duration-300 hover:bg-gold/[0.03]`}
                >
                  <span className="relative z-10">{secondaryLabel}</span>
                  <ArrowRight className={`w-3 h-3 max-[359px]:hidden relative z-10 ${isLight ? "opacity-100" : "opacity-0 group-hover:opacity-100"} group-hover:translate-x-1 transition-all duration-300`} />
                </button>
              </motion.div>

              {/* Trust signal */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className={`text-[9px] uppercase tracking-[0.3em] ${isLight ? "text-charcoal/30" : "text-white/25"} font-bold text-center md:text-left`}
              >
                Discreet · Confidential · By Invitation
              </motion.p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
