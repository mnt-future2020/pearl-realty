import { ReactNode } from "react";

// One size for every button on phones. Important, because call sites pass their own padding and text sizes.
const PHONE_SIZE =
  "max-sm:!flex max-sm:items-center max-sm:justify-center max-sm:mx-auto max-sm:!w-[min(280px,calc(100vw-3rem))] max-sm:!max-w-full max-sm:!h-12 max-sm:!px-4 max-sm:!py-0 max-sm:whitespace-nowrap max-sm:[&_span]:!text-[10px] max-sm:[&_span]:!tracking-[0.15em]";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const MagneticButton = ({ 
  children, 
  className = "", 
  onClick, 
  primary = false,
  type = "button",
  disabled = false
}: MagneticButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${PHONE_SIZE} relative z-20 group font-body text-xs tracking-[0.3em] uppercase px-10 py-5 font-semibold transition-all duration-300 ease-out overflow-hidden cursor-pointer pointer-events-auto hover:-translate-y-[2px] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${
        primary
          ? "bg-champagne text-charcoal dark:text-background border border-transparent shadow-[0_4px_20px_-4px_hsla(38,45%,52%,0.4)] dark:shadow-[0_2px_20px_-4px_hsla(38,55%,47%,0.35)] hover:shadow-[0_12px_30px_-4px_hsla(38,45%,52%,0.6)]"
          : "border-2 border-charcoal/60 dark:border-champagne/30 text-charcoal dark:text-champagne hover:border-champagne hover:text-champagne dark:hover:border-champagne/60 hover:bg-champagne/5 hover:shadow-[0_0_15px_-3px_hsla(38,45%,52%,0.2)] bg-transparent"
      } ${className}`}
    >
      <span className="relative z-10 pointer-events-none">{children}</span>
      
      {/* Decorative Shimmer / Glow Overlays - Pointer Events MUST be none */}
      {primary && (
        <>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute inset-0 -translate-x-[150%] skew-x-[25deg] w-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer-sweep_1.5s_ease-in-out_infinite] pointer-events-none blur-[2px]" />
        </>
      )}
    </button>
  );
};

export default MagneticButton;
