"use client";

import { CSSProperties, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// .dark resets these tokens to near-black; this keeps a section on the theme's Deep Graphite (--charcoal)
export const DEEP_GRAPHITE = { "--charcoal-deep": "0 0% 11%", "--background": "0 0% 11%" } as CSSProperties;

const flow = (duration: number, delay = 0): CSSProperties => ({
  animation: `pattern-flow ${duration}s linear ${delay}s infinite`,
});
const twinkle = (duration: number, delay = 0): CSSProperties => ({
  animation: `pattern-twinkle ${duration}s ease-in-out ${delay}s infinite`,
});

// --- Market Timing: abstract ribbons of flowing capital ---

// Three periods wide, so moving by one period loops seamlessly on screens up to 3840px
const WAVE_PERIOD = 1920;

const waveLayers = [
  { lines: 10, cycles: 1, phase: 0, opacity: 0.14, width: 1, animation: "pattern-drift 80s linear infinite" },
  { lines: 8, cycles: 2, phase: 2, opacity: 0.1, width: 1, animation: "pattern-drift 110s linear infinite reverse" },
  {
    lines: 3,
    cycles: 1,
    phase: 1,
    opacity: 0.24,
    width: 1,
    animation: "pattern-drift 55s linear infinite, pattern-twinkle 10s ease-in-out infinite",
  },
];

const wavePath = (position: number, cycles: number, phase: number) => {
  const commands: string[] = [];

  for (let x = 0; x <= WAVE_PERIOD * 3; x += 32) {
    const angle = (x / WAVE_PERIOD) * Math.PI * 2 * cycles;
    const y =
      300 +
      (position - 0.5) * 130 +
      Math.sin(angle + phase + position * 1.4) * (60 + 130 * position) +
      Math.sin(angle * 2 + phase) * 28 * (1 - position);
    commands.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
  }

  return commands.join(" ");
};

// Fades out before the section's copy
const waveMask = "linear-gradient(to bottom, transparent 35%, #000 85%)";

const WavePattern = () => (
  <div
    className="absolute inset-x-0 -bottom-32 h-[600px] overflow-hidden opacity-60 md:opacity-100"
    style={{ maskImage: waveMask, WebkitMaskImage: waveMask }}
  >
    {waveLayers.map((layer, i) => (
      <svg
        key={i}
        width={WAVE_PERIOD * 3}
        height="600"
        fill="none"
        className="absolute left-0 top-0 max-w-none"
        style={{ animation: layer.animation }}
      >
        <g className={i === 2 ? "stroke-champagne-glow" : "stroke-champagne"} strokeOpacity={layer.opacity} strokeWidth={layer.width}>
          {Array.from({ length: layer.lines }, (_, line) => (
            <path key={line} d={wavePath(line / (layer.lines - 1), layer.cycles, layer.phase)} />
          ))}
        </g>
      </svg>
    ))}
  </div>
);

// --- Off Market: a mashrabiya privacy screen, with a few panels lit from behind ---

const TILE = 80;

const litPanels = [
  [0, 2], [1, 7], [2, 1], [1, 12], [3, 5], [0, 15], [4, 10], [2, 18], [3, 24], [1, 22], [0, 28],
  [12, 1], [13, 4], [14, 8], [15, 2], [16, 6], [13, 12], [16, 11], [14, 17], [15, 21], [12, 26], [16, 27],
];

const STAR_SQUARE = "M14 14 H66 V66 H14 Z";
const STAR_DIAMOND = "M40 3.2 L76.8 40 L40 76.8 L3.2 40 Z";

// Keeps the screen away from the section heading; sized in px because the section height varies by device
const latticeMask = "radial-gradient(ellipse 760px 380px at 50% 280px, transparent 50%, #000 100%)";

const LatticePattern = () => (
  <svg
    width="100%"
    height="100%"
    fill="none"
    className="absolute inset-0"
    style={{ maskImage: latticeMask, WebkitMaskImage: latticeMask }}
  >
    <defs>
      <pattern id="mashrabiya" width={TILE} height={TILE} patternUnits="userSpaceOnUse">
        <g className="stroke-champagne" strokeOpacity="0.22">
          <path d={STAR_SQUARE} />
          <path d={STAR_DIAMOND} />
          <path d="M40 0 V3.2 M40 76.8 V80 M0 40 H3.2 M76.8 40 H80" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#mashrabiya)" />
    {litPanels.map(([column, row], i) => (
      <g
        key={i}
        transform={`translate(${column * TILE} ${row * TILE})`}
        className="fill-champagne/25 stroke-champagne-glow"
      >
        <g style={twinkle(5 + (i % 4), i * 0.45)}>
          <path d={STAR_SQUARE} />
          <path d={STAR_DIAMOND} />
        </g>
      </g>
    ))}
  </svg>
);

// --- Your Next Move: Dubai's skyline, rising either side of the centrepiece ---

const GROUND = 560;

type Tower = { x: number; width: number; height: number; steps?: number; spire?: number };

const leftSkyline: Tower[] = [
  { x: 6, width: 60, height: 250 },
  { x: 74, width: 48, height: 340, steps: 1 },
  { x: 130, width: 70, height: 220 },
  { x: 208, width: 56, height: 450, steps: 4, spire: 90 },
  { x: 272, width: 62, height: 300, steps: 1 },
  { x: 342, width: 50, height: 370, spire: 30 },
  { x: 400, width: 74, height: 190 },
];

const rightSkyline: Tower[] = [
  { x: 46, width: 72, height: 210 },
  { x: 126, width: 44, height: 390, steps: 2, spire: 40 },
  { x: 178, width: 66, height: 270 },
  { x: 252, width: 52, height: 340, steps: 1 },
  { x: 312, width: 60, height: 240 },
  { x: 380, width: 46, height: 420, steps: 3, spire: 60 },
  { x: 434, width: 66, height: 280 },
];

const towerOutline = ({ x, width, height, steps = 0, spire = 0 }: Tower) => {
  const stepHeight = height / (steps + 2);
  const inset = (width * 0.32) / Math.max(steps, 1);
  let left = x;
  let right = x + width;
  let y = GROUND - height + (steps * stepHeight);
  const leftEdge = [`M${left} ${GROUND}`, `V${y}`];
  const rightEdge = [`V${GROUND}`];

  for (let step = 0; step < steps; step++) {
    left += inset;
    right -= inset;
    leftEdge.push(`H${left}`);
    y -= stepHeight;
    leftEdge.push(`V${y}`);
    rightEdge.unshift(`V${y + stepHeight}`, `H${right + inset}`);
  }

  const centre = x + width / 2;
  const top = spire ? [`H${centre}`, `V${y - spire}`, `V${y}`] : [];
  return [...leftEdge, ...top, `H${right}`, ...rightEdge].join(" ");
};

// Deterministic, so server and browser render the same windows
const towerWindows = (tower: Tower, towerIndex: number) => {
  const windows: { x: number; y: number; delay: number }[] = [];
  const top = GROUND - tower.height * 0.72;

  for (let column = 0; column * 14 + 10 < tower.width - 6; column++) {
    for (let row = 0; top + row * 22 < GROUND - 16; row++) {
      if ((column * 7 + row * 3 + towerIndex * 5) % 9 === 0) {
        windows.push({
          x: tower.x + 8 + column * 14,
          y: top + row * 22,
          delay: ((column + 1) * (row + 2) * 0.37) % 6,
        });
      }
    }
  }

  return windows;
};

const SkylineSide = ({ towers, className }: { towers: Tower[]; className: string }) => (
  <svg viewBox={`0 0 520 ${GROUND}`} fill="none" className={`absolute bottom-0 h-auto w-[46vw] md:w-[36vw] max-w-[620px] ${className}`}>
    {towers.map((tower, i) => (
      <g key={tower.x}>
        <path d={towerOutline(tower)} className="stroke-champagne" strokeOpacity="0.5" />
        {towerWindows(tower, i).map((window) => (
          <rect
            key={`${window.x}-${window.y}`}
            x={window.x}
            y={window.y}
            width="5"
            height="9"
            className="fill-champagne-glow"
            style={twinkle(5, window.delay)}
          />
        ))}
      </g>
    ))}
  </svg>
);

const SkylinePattern = () => (
  <>
    <SkylineSide towers={leftSkyline} className="left-0" />
    <SkylineSide towers={rightSkyline} className="right-0" />
  </>
);

// --- How It Works: architectural floor plans at the edges of the band ---

const FloorPlan = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <svg viewBox="0 0 600 600" fill="none" className={`absolute h-auto ${className}`}>
    <g className="fill-champagne/10">
      <rect x="44" y="44" width="256" height="196" style={twinkle(8, delay)} />
      <rect x="304" y="324" width="252" height="232" style={twinkle(8, delay + 4)} />
    </g>
    <g className="stroke-champagne" strokeOpacity="0.25">
      <path strokeWidth="2" d="M40 40 H560 V560 H40 Z" />
      <path strokeWidth="1.5" d="M300 40 V180 M300 240 V320 H420 M480 320 H560 M40 240 H230 M40 400 H300 V470 M300 530 V560" />
      <path d="M300 180 A60 60 0 0 1 240 240 M420 320 A60 60 0 0 0 480 380 M300 470 A60 60 0 0 1 360 530" />
      <rect x="360" y="90" width="150" height="110" />
      <path d="M360 120 H510" />
      <rect x="90" y="280" width="120" height="70" rx="6" />
      <circle cx="170" cy="480" r="42" />
    </g>
    <g className="stroke-champagne-glow" strokeOpacity="0.4">
      <path d="M40 14 V26 M560 14 V26 M14 40 V52 M14 548 V560" />
      <path d="M40 20 H560" strokeDasharray="6 10" style={flow(14, delay)} />
      <path d="M20 46 V554" strokeDasharray="6 10" style={flow(18, delay)} />
    </g>
  </svg>
);

const FloorPlanPattern = () => (
  <>
    <FloorPlan className="-left-44 md:-left-32 -bottom-20 w-[340px] md:w-[440px]" />
    <FloorPlan className="-right-44 md:-right-32 -top-20 w-[320px] md:w-[420px] rotate-90" delay={3} />
  </>
);

// --- Shared wrapper ---

const patterns = {
  waves: WavePattern,
  lattice: LatticePattern,
  skyline: SkylinePattern,
  floorplan: FloorPlanPattern,
};

interface DarkSectionBackgroundProps {
  pattern: keyof typeof patterns;
  glows?: boolean;
}

const DarkSectionBackground = ({ pattern, glows = true }: DarkSectionBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftGlowY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const rightGlowY = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);
  const Pattern = patterns[pattern];

  return (
    <div ref={ref} className="dark-pattern absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {glows && (
        <>
          <motion.div
            style={{ y: leftGlowY }}
            className="absolute top-[35%] -left-40 w-[450px] md:w-[700px] h-[450px] md:h-[700px] bg-champagne/25 rounded-full blur-[160px]"
          />
          <motion.div
            style={{ y: rightGlowY }}
            className="absolute top-[5%] -right-40 w-[450px] md:w-[700px] h-[450px] md:h-[700px] bg-champagne/15 rounded-full blur-[160px]"
          />
        </>
      )}
      <Pattern />
    </div>
  );
};

export default DarkSectionBackground;
