"use client";

import React, { MouseEvent, useEffect, useRef, useState } from "react";
import {
  MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import DarkSectionBackground, { DEEP_GRAPHITE } from "@/components/DarkSectionBackground";

// --- Shared Motion ---

const EASE = [0.16, 1, 0.3, 1] as const;

// Fades an element's bottom edge into whatever sits behind it
const fadeBottom = (distance: string) => {
  const mask = `linear-gradient(to bottom, #000 calc(100% - ${distance}), transparent)`;
  return { maskImage: mask, WebkitMaskImage: mask };
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.6, delay, ease: "easeInOut" as const },
  }),
};

// A translucent tint, so the section glow shows through the digits
const numberTint = (opacity: number) => ({ color: `hsl(var(--champagne) / ${opacity})` });

const useMediaQuery = (media: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(media);
    const update = () => setMatches(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [media]);

  return matches;
};

// --- Animated Glyphs ---

const ROUTE = "M18 96 C 34 44, 66 26, 102 28";

const PathwayGlyph = () => (
  <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden="true">
    <motion.path variants={draw} custom={0.3} d={ROUTE} className="stroke-gold" strokeWidth="1.25" />
    <motion.path variants={draw} custom={0.6} d="M18 96 C 52 92, 84 72, 102 28" className="stroke-gold/50" strokeWidth="1" />
    <motion.path
      d="M18 96 C 26 66, 60 70, 102 28"
      className="stroke-gold/40"
      strokeWidth="1"
      strokeDasharray="3 5"
      animate={{ strokeDashoffset: [0, -32] }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
    <circle cx="18" cy="96" r="3" className="fill-gold/60" />
    <motion.circle
      cx="102"
      cy="28"
      r="9"
      className="stroke-gold/50"
      style={{ originX: "50%", originY: "50%" }}
      animate={{ scale: [0.7, 1.3, 0.7], opacity: [0.8, 0.1, 0.8] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    />
    <circle cx="102" cy="28" r="3.5" className="fill-gold" />
    <circle r="2.5" className="fill-gold">
      <animateMotion dur="5s" repeatCount="indefinite" path={ROUTE} />
    </circle>
  </svg>
);

const StructureGlyph = () => {
  const leaves = [24, 60, 96];

  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden="true">
      {leaves.map((x, i) => (
        <motion.path
          key={x}
          variants={draw}
          custom={0.3 + i * 0.2}
          d={`M60 26 C 60 58, ${x} 50, ${x} 84`}
          className={x === 60 ? "stroke-gold" : "stroke-gold/50"}
          strokeWidth="1.25"
        />
      ))}
      <rect x="51" y="14" width="18" height="18" rx="9" className="fill-background stroke-gold" strokeWidth="1.25" />
      <circle cx="60" cy="23" r="3.5" className="fill-gold" />
      {leaves.map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy="92"
          r="7"
          className="fill-gold/10 stroke-gold"
          strokeWidth="1"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 3, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
};

const MarketGlyph = () => {
  const towers = [
    { x: 14, h: 30 },
    { x: 30, h: 46 },
    { x: 46, h: 38 },
    { x: 62, h: 72 },
    { x: 78, h: 52 },
    { x: 94, h: 62 },
  ];

  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden="true">
      {towers.map((tower, i) => (
        <motion.rect
          key={tower.x}
          x={tower.x}
          y={104 - tower.h}
          width="11"
          height={tower.h}
          rx="1.5"
          className="fill-gold/15 stroke-gold/60"
          strokeWidth="1"
          style={{ originY: 1 }}
          animate={{ scaleY: [1, 0.82, 1] }}
          transition={{ duration: 4, delay: i * 0.35, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <path d="M6 104.5 H114" className="stroke-gold/50" strokeWidth="1" />
      <motion.path
        variants={draw}
        custom={0.4}
        d="M12 66 C 32 60, 44 54, 56 44 S 84 20, 110 14"
        className="stroke-gold"
        strokeWidth="1.25"
      />
    </svg>
  );
};

// --- Content ---

const receives = [
  {
    title: "A pathway map",
    body: "The viable routes into Dubai for your circumstances, set against your existing structures.",
    Glyph: PathwayGlyph,
    depth: 16,
    offset: "lg:mt-10",
  },
  {
    title: "Structuring considerations",
    body: "Holding and ownership questions to take to your own counsel and tax advisors.",
    Glyph: StructureGlyph,
    depth: 40,
    offset: "lg:mt-0",
  },
  {
    title: "Market context",
    body: "Our private brief on off-market ultra-prime pricing, yield and availability.",
    Glyph: MarketGlyph,
    depth: 28,
    offset: "lg:mt-16",
  },
];

const steps = [
  { title: "Request", body: "Share a few details below. Reply within 24 hours." },
  { title: "Discovery call", body: "A private 20-minute conversation about your objectives." },
  { title: "Private briefing", body: "Your pathway map, walked through with you and your advisors." },
  { title: "Confidential review", body: "Where relevant, opportunities shared under NDA." },
];

// --- Heading Pieces ---

const MaskedWords = ({ text, delay = 0, gold = false }: { text: string; delay?: number; gold?: boolean }) => (
  <>
    {text.split(" ").map((word, i) => (
      <React.Fragment key={word}>
        <span className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
          <motion.span
            className={`inline-block ${gold ? "text-gradient-gold" : ""}`}
            variants={{
              hidden: { y: "115%" },
              visible: { y: 0, transition: { duration: 1.2, delay: delay + i * 0.12, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
        </span>{" "}
      </React.Fragment>
    ))}
  </>
);

const LABEL_SIZES = {
  primary: {
    box: "h-20 md:h-28 lg:h-32",
    text: "text-base md:text-3xl lg:text-4xl tracking-[0.2em] md:tracking-[0.3em] gap-3 md:gap-8",
    line: "w-4 md:w-20 h-0.5",
  },
  secondary: {
    box: "h-10 md:h-12",
    text: "text-xs md:text-sm lg:text-base tracking-[0.3em] gap-3 md:gap-4",
    line: "w-6 md:w-10 h-px",
  },
};

// The dark: colours apply inside the How It Works band, which carries the .dark theme class
const FeaturedLabel = ({ text, size }: { text: string; size: keyof typeof LABEL_SIZES }) => {
  const { box, text: textClass, line } = LABEL_SIZES[size];
  const lineClass = `${line} bg-gold-muted/70 dark:bg-champagne-glow/70`;
  const reveal = {
    initial: { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: EASE },
  };

  return (
    <div className={`flex items-center justify-center ${box}`}>
      <h3 className={`flex items-center font-body uppercase whitespace-nowrap text-gold-muted dark:text-champagne-glow font-bold ${textClass}`}>
        <motion.span className={`${lineClass} origin-right`} {...reveal} />
        {text}
        <motion.span className={`${lineClass} origin-left`} {...reveal} />
      </h3>
    </div>
  );
};

// --- What You Receive: arches rising at different depths ---

const ReceiveArch = ({
  item,
  index,
  progress,
  isDesktop,
}: {
  item: (typeof receives)[number];
  index: number;
  progress: MotionValue<number>;
  isDesktop: boolean;
}) => {
  const y = useTransform(progress, [0, 1], isDesktop ? [item.depth, -item.depth] : [0, 0]);

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const tiltX = useSpring(useTransform(pointerY, [0, 1], [5, -5]), { stiffness: 120, damping: 18 });
  const tiltY = useSpring(useTransform(pointerX, [0, 1], [-7, 7]), { stiffness: 120, damping: 18 });
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${spotX}px ${spotY}px, hsl(var(--champagne) / 0.16), transparent 70%)`;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handleLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  const { Glyph } = item;

  return (
    <motion.div style={{ y }} className={`${item.offset} [perspective:1200px]`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="h-full"
      >
        <motion.div
          className="h-full"
          variants={{
            hidden: { clipPath: "inset(100% 0% 0% 0%)", y: 60 },
            visible: {
              clipPath: "inset(0% 0% 0% 0%)",
              y: 0,
              transition: { duration: 1.5, delay: index * 0.18, ease: EASE },
            },
          }}
        >
          <motion.div
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ rotateX: tiltX, rotateY: tiltY, ...fadeBottom("24px") }}
            className="group relative h-full p-px rounded-t-[999px] bg-gradient-to-b from-champagne/70 via-champagne/20 to-transparent"
          >
            <div className="relative h-full rounded-t-[999px] overflow-hidden bg-gradient-to-b from-white to-[#F8F7F4]">
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: spotlight }}
              />
              {/* Inner arch line */}
              <div className="absolute inset-x-3 top-3 bottom-0 rounded-t-[999px] border border-b-0 border-champagne/25 group-hover:border-champagne/50 pointer-events-none" />

              <div className="relative flex flex-col items-center text-center px-8 xl:px-14 pt-20 md:pt-24 xl:pt-28 pb-8 xl:pb-12">
                <div className="w-32 h-32 md:w-36 md:h-36 xl:w-44 xl:h-44 mb-8 md:mb-10 transition-transform duration-700 ease-out group-hover:scale-110">
                  <Glyph />
                </div>
                <h4 className="font-display text-3xl md:text-4xl xl:text-[2.75rem] xl:leading-tight font-light text-foreground mb-5">{item.title}</h4>
                <p className="font-body text-base md:text-lg xl:text-xl font-light leading-relaxed text-foreground/70 group-hover:text-foreground/90">
                  {item.body}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ReceiveArches = ({ isDesktop }: { isDesktop: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="grid lg:grid-cols-3 lg:items-start gap-8 max-w-lg lg:max-w-none mx-auto min-[1400px]:-mx-12 min-[1700px]:-mx-24">
      {receives.map((item, i) => (
        <ReceiveArch key={item.title} item={item} index={i} progress={scrollYProgress} isDesktop={isDesktop} />
      ))}
    </div>
  );
};

// --- How It Works: a pearl travelling a gold path as the page scrolls ---

// Passes through each row's centre, swinging between two x positions
const buildPath = (h: number, right: number, left: number, centre: number) => {
  const row = h / 4;
  const y = [row * 0.5, row * 1.5, row * 2.5, row * 3.5];
  const pull = row * 0.45;

  return [
    `M${centre} 0`,
    `C${centre} ${pull}, ${right} ${y[0] - pull}, ${right} ${y[0]}`,
    `C${right} ${y[0] + pull}, ${left} ${y[1] - pull}, ${left} ${y[1]}`,
    `C${left} ${y[1] + pull}, ${right} ${y[2] - pull}, ${right} ${y[2]}`,
    `C${right} ${y[2] + pull}, ${left} ${y[3] - pull}, ${left} ${y[3]}`,
    `C${left} ${y[3] + pull}, ${centre} ${h - pull}, ${centre} ${h}`,
  ].join(" ");
};

const StepRow = ({
  step,
  index,
  active,
  isDesktop,
}: {
  step: (typeof steps)[number];
  index: number;
  active: boolean;
  isDesktop: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numberY = useTransform(scrollYProgress, [0, 1], isDesktop ? [24, -24] : [0, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], isDesktop ? [8, -8] : [0, 0]);

  const flipped = index % 2 === 1;
  const number = `0${index + 1}`;
  const tint = numberTint(active ? 0.55 : 0.2);

  return (
    <div ref={ref} className="relative flex items-center py-4 lg:py-0">
      {/* Copy */}
      <motion.div
        style={{ y: textY }}
        className={`relative z-10 pl-14 lg:pl-0 lg:w-[42%] ${flipped ? "lg:ml-[58%]" : "lg:text-right"}`}
      >
        <span
          style={tint}
          className="lg:hidden block font-display font-light text-3xl leading-none mb-2"
        >
          {number}
        </span>
        <h4
          className={`font-display text-2xl lg:text-3xl font-light mb-1 lg:mb-2 ${
            active ? "text-foreground" : "text-foreground/50"
          }`}
        >
          {step.title}
        </h4>
        <p
          className={`font-body text-sm md:text-base font-light leading-relaxed ${
            active ? "text-foreground/70" : "text-foreground/50"
          }`}
        >
          {step.body}
        </p>
      </motion.div>

      {/* Oversized number on the far side of the path */}
      <div
        className={`hidden lg:flex absolute inset-y-0 items-center pointer-events-none select-none ${
          flipped ? "right-[61%]" : "left-[61%]"
        }`}
        aria-hidden="true"
      >
        <motion.div style={{ y: numberY }} className="relative font-display font-light leading-none text-7xl xl:text-8xl">
          <span style={tint} className="block">
            {number}
          </span>
          <span
            className={`absolute inset-0 text-gradient-gold transition-opacity duration-1000 ${
              active ? "opacity-30" : "opacity-0"
            }`}
          >
            {number}
          </span>
        </motion.div>
      </div>
    </div>
  );
};

const StepsPathway = ({ isDesktop, reduceMotion }: { isDesktop: boolean; reduceMotion: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathBoxRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [box, setBox] = useState({ w: 0, h: 0 });
  const [reachedCount, setReachedCount] = useState(0);
  const activeCount = reduceMotion ? steps.length : reachedCount;

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 65%", "end 65%"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const progress = useTransform(smoothProgress, (v) => Math.min(Math.max(v, 0), 1));

  const pearlX = useMotionValue(0);
  const pearlY = useMotionValue(0);

  useEffect(() => {
    const el = pathBoxRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setBox({ w: entry.contentRect.width, h: entry.contentRect.height });
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const placePearl = (value: number) => {
    const path = pathRef.current;
    if (!path || !box.h) return;

    const point = path.getPointAtLength(value * path.getTotalLength());
    pearlX.set(point.x);
    pearlY.set(point.y);
    // A row lights up as the pearl reaches its centre, with a small lead for the glow
    setReachedCount(Math.floor(((point.y + 8) / box.h) * steps.length + 0.5));
  };

  useMotionValueEvent(progress, "change", placePearl);

  useEffect(() => {
    placePearl(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [box.w, box.h, isDesktop]);

  const right = isDesktop ? box.w * 0.54 : box.w * 0.72;
  const left = isDesktop ? box.w * 0.46 : box.w * 0.28;
  const pathData = box.h ? buildPath(box.h, right, left, box.w / 2) : "";
  const nodes = steps.map((_, i) => ({
    x: i % 2 === 0 ? right : left,
    y: (box.h / steps.length) * (i + 0.5),
  }));

  return (
    <div ref={containerRef} className="relative">
      <div ref={pathBoxRef} className="absolute inset-y-0 left-0 w-10 lg:w-full pointer-events-none" aria-hidden="true">
        {box.h > 0 && (
          <svg width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`} fill="none" className="absolute inset-0 overflow-visible">
            <path d={pathData} className="stroke-champagne/20" strokeWidth="1" strokeDasharray="2 7" />
            <motion.path d={pathData} className="stroke-champagne/15" strokeWidth="7" style={{ pathLength: reduceMotion ? 1 : progress }} />
            <motion.path ref={pathRef} d={pathData} className="stroke-champagne" strokeWidth="1.5" style={{ pathLength: reduceMotion ? 1 : progress }} />
            {nodes.map((node, i) => (
              <g key={i}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="11"
                  className={`transition-opacity duration-700 stroke-champagne/40 ${activeCount > i ? "opacity-100" : "opacity-0"}`}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="4"
                  className={activeCount > i ? "fill-champagne stroke-champagne" : "fill-none stroke-champagne/50"}
                />
              </g>
            ))}
          </svg>
        )}
        <motion.div
          style={{ x: pearlX, y: pearlY }}
          className={`absolute left-0 top-0 ${box.h && !reduceMotion ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className="w-4 h-4 -ml-2 -mt-2 rounded-full shadow-[0_0_30px_8px_hsl(var(--champagne)/0.45)]"
            style={{ background: "radial-gradient(circle at 35% 30%, #fff, hsl(var(--champagne-glow)) 55%, hsl(var(--champagne)))" }}
          />
        </motion.div>
      </div>

      <div className="grid auto-rows-fr lg:[grid-auto-rows:minmax(140px,1fr)]">
        {steps.map((step, i) => (
          <StepRow key={step.title} step={step} index={i} active={activeCount > i} isDesktop={isDesktop} />
        ))}
      </div>
    </div>
  );
};

// --- Section ---

const DOME = "M0 80 Q720 -80 1440 80 Z";

const SectionCurve = ({ className, fill, d }: { className: string; fill: string; d: string }) => (
  <svg
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
    className={`absolute inset-x-0 w-full h-11 md:h-[75px] pointer-events-none z-20 ${className}`}
    aria-hidden="true"
  >
    <path d={d} fill={fill} />
  </svg>
);

const CapitalMigrationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  // The arch and path layouts only separate from the stacked layout at the lg breakpoint
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const { scrollYProgress: headerProgress } = useScroll({ target: headerRef, offset: ["start end", "end start"] });

  const glowOneY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const glowTwoY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);

  const ringsY = useTransform(headerProgress, [0, 1], [-120, 160]);
  const innerRingY = useTransform(headerProgress, [0, 1], [-60, 80]);
  const ringsScale = useTransform(headerProgress, [0, 0.5, 1], [0.8, 1, 1.25]);
  const copyY = useTransform(headerProgress, [0, 1], [40, -40]);

  return (
    // Sits above the CTA and overlaps it, so the hand image runs behind the dome. z-[35] clears the CTA's z-30 content.
    <section ref={sectionRef} id="capital-migration" className="relative z-[35] -mt-11 md:-mt-[75px] scroll-mt-16">
      {/* Light: heading and what you receive */}
      <div className="relative overflow-hidden text-foreground pt-20 md:pt-28 pb-10 xl:pb-14">
        <SectionCurve className="top-0" fill="#F8F7F4" d={DOME} />

        <div className="absolute inset-x-0 top-11 md:top-[75px] bottom-0 bg-[#F8F7F4] pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 overflow-hidden" style={fadeBottom("320px")}>
            <motion.div
              style={{ y: glowOneY }}
              className="absolute top-[8%] -left-40 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-champagne/20 rounded-full blur-[160px]"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/* Header */}
          <div ref={headerRef} className="relative flex items-center justify-center text-center pt-8 md:pt-14">
            {/* Orbiting pearl rings, faded out at the top so they stay inside the dome */}
            <div
              className="absolute -inset-x-[50vw] -inset-y-[500px] flex items-center justify-center pointer-events-none"
              style={{
                maskImage: "linear-gradient(to bottom, transparent 420px, #000 560px)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 420px, #000 560px)",
              }}
              aria-hidden="true"
            >
              <motion.div style={{ y: ringsY, scale: ringsScale }} className="absolute w-[150vw] max-w-[860px] aspect-square">
                <motion.div
                  className="absolute inset-0 rounded-full border border-dashed border-champagne/50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className="absolute top-[14.6%] left-[14.6%] w-3 h-3 -ml-1.5 -mt-1.5 rounded-full shadow-[0_0_24px_6px_hsl(var(--champagne)/0.45)]"
                    style={{ background: "radial-gradient(circle at 35% 30%, #fff, hsl(var(--gold)))" }}
                  />
                </motion.div>
              </motion.div>
              <motion.div style={{ y: innerRingY }} className="absolute w-[110vw] max-w-[600px] aspect-square">
                <motion.div
                  className="absolute inset-0 rounded-full border border-champagne/35"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className="absolute bottom-[14.6%] right-[14.6%] w-2 h-2 -mr-1 -mb-1 rounded-full shadow-[0_0_18px_4px_hsl(var(--champagne)/0.5)]"
                    style={{ background: "hsl(var(--gold))" }}
                  />
                </motion.div>
                <div className="absolute inset-[22%] rounded-full bg-champagne/20 blur-[70px]" />
              </motion.div>
            </div>

            <motion.div style={{ y: copyY }} className="relative z-10 flex flex-col items-center">
              {/* The trigger sits on the heading because the words start clipped by their masks */}
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="font-display text-4xl sm:text-5xl md:text-7xl font-light leading-[1.15] md:leading-[1.05] mb-8 md:mb-10"
              >
                <span className="block">
                  <MaskedWords text="Capital Migration" />
                </span>
                <span className="block">
                  <MaskedWords text="Pathway Assessment" delay={0.25} gold />
                </span>
              </motion.h2>
              <ScrollReveal delay={500}>
                <p className="font-body text-base md:text-xl text-foreground/70 max-w-2xl font-light leading-relaxed">
                  A confidential, no-obligation review for families and family offices considering Dubai for jurisdictional diversification, succession planning or real asset placement.
                </p>
              </ScrollReveal>
            </motion.div>
          </div>

          {/* What You Receive */}
          <div className="mt-4 md:mt-6">
            <FeaturedLabel text="What you receive" size="primary" />
            <ReceiveArches isDesktop={isDesktop} />
          </div>
        </div>
      </div>

      {/* Dark: how it works */}
      <div
        className="relative overflow-hidden bg-charcoal-deep dark text-foreground pt-6 md:pt-8 pb-24 md:pb-32"
        style={DEEP_GRAPHITE}
      >
        <DarkSectionBackground pattern="floorplan" glows={false} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div
            style={{ y: glowOneY }}
            className="absolute top-[5%] -left-40 w-[450px] md:w-[700px] h-[450px] md:h-[700px] bg-champagne/25 rounded-full blur-[160px]"
          />
          <motion.div
            style={{ y: glowTwoY }}
            className="absolute top-[20%] -right-40 w-[450px] md:w-[700px] h-[450px] md:h-[700px] bg-champagne/15 rounded-full blur-[160px]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <FeaturedLabel text="How it works" size="secondary" />
          <StepsPathway isDesktop={isDesktop} reduceMotion={reduceMotion} />
        </div>

        {/* Curved hand-off into the light contact section */}
        <SectionCurve className="bottom-0" fill="#F8F7F4" d={DOME} />
      </div>
    </section>
  );
};

export default CapitalMigrationSection;
