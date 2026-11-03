"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/logo.png";
import lightLogo from "@/assets/light_logo.png";
import Link from "next/link";
import { Phone, MessageSquare } from "lucide-react";

const NAV_LINKS = [
  { label: "Advisory", id: "founder" },
  { label: "Market", id: "services" },
  { label: "Clientele", id: "clients" },
  { label: "Insights", id: "insights" },
  { label: "Capital Migration Pathway Assessment", id: "capital-migration" },
  { label: "Contact", id: "contact" },
];

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "WhatsApp", href: "https://wa.me/971585926469" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const scrollTo = (id: string) => {
    setSidebarOpen(false);
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  const isOpportunityPage = mounted && window.location.pathname.includes("/opportunity/");

  return (
    <>
      {/* ── Main Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-pearl/90 dark:bg-background/95 backdrop-blur-xl border-b border-champagne/20 dark:border-champagne/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_-4px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => window.location.pathname === "/" ? scrollTo("hero") : window.location.href = "/"}
            className="flex items-center"
          >
            <Image
              src={scrolled || isOpportunityPage ? lightLogo : logo}
              alt="Pearl Legacy"
              width={140}
              height={45}
              className="h-10 md:h-12 w-auto object-contain transition-all duration-500"
            />
          </button>

          {/* Desktop right: Book Consultation + toggle + hamburger */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo("contact")}
              className="relative px-6 py-3 rounded-full font-body text-[10px] tracking-[0.3em] uppercase font-medium transition-all duration-300 group overflow-hidden border border-[#C7A56A] text-[#C7A56A] hover:border-[#C7A56A] hover:shadow-[0_0_15px_rgba(199,165,106,0.3)]"
            >
              <div className="absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-0 bg-[#C7A56A]" />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-[#111111]">
                Book Consultation
              </span>
            </button>
            <HamburgerButton open={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />
          </div>

          {/* Mobile: hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <HamburgerButton open={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />
          </div>
        </div>
      </nav>

      {/* ── Overlay ── */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 max-w-[88vw] z-[70] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] dark ${sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        style={{
          background: "linear-gradient(160deg, hsl(0 0% 7%), hsl(0 0% 5%))",
          borderLeft: "1px solid hsla(38,55%,47%,0.12)",
        }}
      >
        {/* Sidebar header */}
        <div className="flex justify-between items-center px-8 py-6 border-b border-champagne/10">
          <Image
            src={logo}
            alt="Pearl Legacy"
            width={110}
            height={35}
            className="h-16 w-auto object-contain"
          />
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-champagne/20 text-champagne/60 hover:text-champagne hover:border-champagne/50 transition-all duration-300"
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M1 1l12 12M13 1L1 13" />
            </svg>
          </button>
        </div>

        {/* Nav links + content */}
        <nav className="px-6 py-5 flex-1 flex flex-col">
          {/* Navigate */}
          <p className="font-body text-[9px] tracking-[0.4em] uppercase text-muted-foreground/40 mb-2">Navigate</p>
          <ul>
            {NAV_LINKS.map((link, i) => (
              <li key={link.id}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="group w-full flex items-center gap-3 py-[7px] text-left transition-all duration-300"
                  style={{ transitionDelay: sidebarOpen ? `${i * 40}ms` : "0ms" }}
                >
                  <span className="w-0 group-hover:w-3 h-px bg-champagne transition-all duration-300 flex-shrink-0" />
                  <span className="font-body text-sm font-medium text-foreground/60 group-hover:text-champagne transition-colors duration-300 tracking-wide">
                    {link.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-4 h-px bg-gradient-to-r from-champagne/20 to-transparent" />

          {/* Contact info */}
          <p className="font-body text-[9px] tracking-[0.4em] uppercase text-muted-foreground/40 mb-3">Connect</p>
          <div className="space-y-2">
            <a href="mailto:raghunath@pearlrealty.ae" className="flex items-center gap-3 group">
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-champagne/10 text-champagne group-hover:bg-champagne group-hover:text-background transition-all duration-300 flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </span>
              <span className="font-body text-sm text-foreground/80 group-hover:text-champagne transition-colors duration-300">
                raghunath@pearlrealty.ae
              </span>
            </a>
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-champagne/10 text-champagne flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="font-body text-sm text-foreground/80">DIFC, Dubai, UAE</span>
            </div>
            <a href="tel:+971585926469" className="flex items-center gap-3 group">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-champagne/10 text-champagne group-hover:bg-champagne group-hover:text-background transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="font-body text-sm text-foreground/80 group-hover:text-champagne transition-colors duration-300">+971 58 592 6469</span>
            </a>
          </div>

          {/* Divider */}
          <div className="my-4 h-px bg-gradient-to-r from-champagne/20 to-transparent" />

          {/* Social — icons only, horizontal */}
          <p className="font-body text-[9px] tracking-[0.4em] uppercase text-muted-foreground/40 mb-3">Follow</p>
          <div className="flex items-center gap-3">
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/raghunath-nallamuthu-pearl-realty?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-full bg-champagne/10 text-champagne hover:bg-champagne hover:text-background transition-all duration-300">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            {/* Instagram */}
            {/* <a href="#" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-champagne/10 text-champagne hover:bg-champagne hover:text-background transition-all duration-300">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a> */}
            {/* WhatsApp */}
            <a href="https://wa.me/971585926469" aria-label="WhatsApp" className="w-9 h-9 flex items-center justify-center rounded-full bg-champagne/10 text-champagne hover:bg-champagne hover:text-background transition-all duration-300">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </nav>

        {/* CTA button pinned at bottom */}
        <div className="px-6 py-5 border-t border-champagne/10">
          <button
            onClick={() => scrollTo("contact")}
            className="w-full py-3 font-body text-xs tracking-[0.25em] uppercase border border-champagne/40 text-champagne hover:bg-champagne hover:text-background transition-all duration-500"
          >
            Request Private Consultation
          </button>
          <p className="mt-4 font-body text-[9px] tracking-[0.2em] text-center text-muted-foreground/30 leading-relaxed uppercase">
            © 2026 Pearl Realty. All Rights Reserved <br />
            Crafted by <Link href="https://www.mntfuture.com" target="_blank" rel="noopener noreferrer" className="hover:text-champagne transition-colors duration-300">MnT</Link>
          </p>
        </div>
      </aside>
    </>
  );
};

/* ── Hamburger Button ── */
const HamburgerButton = ({ open, onClick }: { open: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      className="w-11 h-11 flex flex-col justify-center items-center gap-[6px] group transition-all duration-300"
    >
      <span
        className={`block w-6 transition-all duration-400 origin-center h-[2.5px] bg-gold group-hover:bg-[#C7A56A] group-hover:-rotate-3 ${open ? "rotate-45 translate-y-[8px] group-hover:rotate-45" : ""}`}
      />
      <span
        className={`block transition-all duration-400 h-[2.5px] bg-gold group-hover:bg-[#C7A56A] ${open ? "w-0 opacity-0" : "w-4"}`}
      />
      <span
        className={`block w-6 transition-all duration-400 origin-center h-[2.5px] bg-gold group-hover:bg-[#C7A56A] group-hover:rotate-3 ${open ? "-rotate-45 -translate-y-[8.5px] group-hover:-rotate-45" : ""}`}
      />
    </button>
  );
};

export default Navbar;
