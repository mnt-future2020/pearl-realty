"use client";

import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";
import { Linkedin, Instagram, Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const FooterSection = () => {
  const scrollToSection = (id: string) => {
    if (typeof window === "undefined") return;

    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative pt-32 pb-16 overflow-hidden" style={{ background: "linear-gradient(180deg, #14140F 0%, #0E0E0B 100%)" }}>
      {/* Cinematic Background Branding */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-0">
        <h2 className="font-display text-[22vw] sm:text-[25vw] leading-none select-none uppercase tracking-tighter" style={{ color: "rgba(199,165,106,0.04)" }}>
          Pearl
        </h2>
      </div>
      {/* Subtle gold glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Content-width columns, so justify-between leaves equal gaps between them */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-16 lg:gap-8 mb-24">
          {/* Brand Identity */}
          <div className="max-w-sm">
            <Link href="/" className="block w-fit mx-auto">
              <Image
                src={logo}
                alt="Pearl Realty"
                width={200}
                height={60}
                className="h-24 w-auto object-contain opacity-80"
              />
            </Link>
            <p className="mt-8 font-body text-sm text-white/40 leading-relaxed max-w-sm">
              Strategic Real Estate Advisory & Private Wealth Positioning.
              Headquartered in the Dubai International Financial Centre (DIFC).
            </p>
            <div className="mt-8 flex flex-col gap-6">
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-champagne/80 block">Discretion · Integrity · Legacy</span>

              {/* Social Media Icons */}
              <div className="flex items-center gap-6 mt-2">
                <Link href="https://www.linkedin.com/in/raghunath-nallamuthu-pearl-realty?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gold/60 hover:text-gold transition-all duration-300 transform hover:scale-110">
                  <Linkedin className="w-5 h-5" />
                </Link>
                {/* <Link href="#" className="text-gold/60 hover:text-gold transition-all duration-300 transform hover:scale-110">
                  <Instagram className="w-5 h-5" />
                </Link> */}
                <Link href="https://wa.me/971585926469" className="text-gold/60 hover:text-gold transition-all duration-300 transform hover:scale-110">
                  <MessageCircle className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Mandate */}
          <div>
            <h4 className="font-display text-xs tracking-[0.4em] uppercase text-white/30 mb-8 underline underline-offset-8 decoration-champagne/30">The Mandate</h4>
            <nav className="flex flex-col gap-4">
              {[
                { label: "Private Advisory", id: "founder" },
                { label: "Value Pillars", id: "services" },
                { label: "Market Intelligence", id: "insights" },
                { label: "Client Portfolio", id: "clients" },
                { label: "Capital Migration Pathway Assessment", id: "capital-migration" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-body text-sm text-white/50 hover:text-champagne transition-all duration-500 text-left group flex items-center gap-2"
                >
                  <span className="w-0 h-px bg-champagne group-hover:w-4 transition-all duration-500" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Institutional Contact */}
          <div>
            <h4 className="font-display text-xs tracking-[0.4em] uppercase text-white/30 mb-8 underline underline-offset-8 decoration-champagne/30">Global Reach</h4>
            <div className="space-y-6">
              <div>
                <p className="font-body text-[10px] text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Secure Correspondence
                </p>
                <p className="font-display text-lg text-champagne/90">raghunath@pearlrealty.ae</p>
              </div>
              <div>
                <p className="font-body text-[10px] text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Direct Line
                </p>
                <Link href="tel:+971585926469" className="font-display text-lg text-champagne/90 hover:text-gold transition-colors">+971 58 592 6469</Link>
              </div>
              <div>
                <p className="font-body text-[10px] text-white/30 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <MapPin className="w-3 h-3" /> Hub Operations
                </p>
                <p className="font-body text-sm text-white/50 leading-relaxed">
                  Gate Avenue, DIFC<br />
                  Dubai, UAE
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Compliance Bar */}
        <div className="pt-12 border-t border-champagne/10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
            <p className="font-body text-[9px] md:text-[10px] tracking-widest text-white/25 uppercase italic">
              Strictly Private & Confidential
            </p>
            <p className="font-body text-[9px] md:text-[10px] tracking-widest text-white/25 uppercase">
              Authorised Access Only
            </p>
          </div>
          <p className="font-body text-[9px] md:text-[10px] tracking-widest text-white/25">
            © 2026 Pearl Realty. All Rights Reserved — Crafted by <Link href="https://www.mntfuture.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors duration-300">MnT</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
