"use client";

import { useEffect, useRef, Suspense } from "react";
import Lenis from "@studio-freight/lenis";
import HeroSection from "@/components/sections/HeroSection";
import IntroductionSection from "@/components/sections/IntroductionSection";
import ManifestoSection from "@/components/sections/ManifestoSection";
import FounderSection from "@/components/sections/FounderSection";
import OpportunitySection from "@/components/sections/OpportunitySection";
import ServicesSection from "@/components/sections/ServicesSection";
import OffMarketSection from "@/components/sections/OffMarketSection";
import ClientsSection from "@/components/sections/ClientsSection";
import InsightsSection from "@/components/sections/InsightsSection";
// import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";
import CapitalMigrationSection from "@/components/sections/CapitalMigrationSection";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";
import Navbar from "@/components/Navbar";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import { useSearchParams } from "next/navigation";

const HomePageContent = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Disable browser automatic scroll restoration
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    
    // Ensure we start at top on initial load/redirect
    window.scrollTo(0, 0);

    // Only register on client
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Handle initial scroll from query param
    const handleInitialScroll = () => {
      const scrollToId = searchParams.get("scrollTo");
      if (scrollToId) {
        const element = document.getElementById(scrollToId);
        if (element) {
          // Wait for page to stabilize and GSAP to refresh
          setTimeout(() => {
            lenis.scrollTo(element, { 
              duration: 2,
              offset: -100 // Adjust for fixed header
            });
            
            // Clean up the URL query param without adding to history
            const url = new URL(window.location.href);
            url.searchParams.delete("scrollTo");
            window.history.replaceState({}, "", url.pathname + url.hash);
          }, 600);
        }
      }
    };

    // Run on mount
    handleInitialScroll();

    // Refresh GSAP after a short delay to ensure all DOM elements are sized correctly
    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      lenis.destroy();
      clearTimeout(refreshTimeout);
    };
  }, [searchParams]);

  return (
    <main className="bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* Vertical doodle guide line */}
      <div className="fixed left-6 top-0 bottom-0 w-px z-40 pointer-events-none hidden lg:block">
        <div className="h-full bg-gradient-to-b from-transparent via-champagne/10 to-transparent" />
      </div>

      <HeroSection />
      <IntroductionSection />

      <ManifestoSection />
      <FounderSection />

      <div className="relative h-16">
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-champagne/10 to-transparent" />
      </div>

      <OpportunitySection />
      <ServicesSection />
      <OffMarketSection />
      <ClientsSection />

      <div className="relative h-32">
        <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-champagne/10 to-transparent" />
      </div>

      <InsightsSection />
      {/* Testimonials hidden for now at the client's request — uncomment (and its import) to bring it back */}
      {/* <TestimonialsSection /> */}
      <CTASection />
      <CapitalMigrationSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
};

export default function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomePageContent />
    </Suspense>
  );
}
