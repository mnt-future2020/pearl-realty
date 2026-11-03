"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Smile, Send, Mail, Info, ChevronDown } from "lucide-react";
import MagneticButton from "./MagneticButton";
import ScrollReveal from "./ScrollReveal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { sendEmail } from "@/app/actions/email";

const emptyForm = {
  name: "",
  email: "",
  enquiringAs: "",
  jurisdictions: "",
  allocation: "",
  timeline: "",
  resolve: "",
  introducedBy: "",
};

type FieldId = keyof typeof emptyForm;

type Field = {
  id: FieldId;
  label: string;
  type?: string;
  options?: string[];
  multiline?: boolean;
  optional?: boolean;
};

const fields: Field[] = [
  { id: "name", label: "Full Name" },
  { id: "email", label: "Email", type: "email" },
  {
    id: "enquiringAs",
    label: "I am enquiring as",
    options: [
      "Principal / family member",
      "Single-family office",
      "Multi-family office",
      "Private banker / advisor",
      "Lawyer / trust company",
    ],
  },
  { id: "jurisdictions", label: "Principal jurisdiction(s)" },
  {
    id: "allocation",
    label: "Indicative allocation to Dubai real assets",
    options: ["Under USD 1M", "USD 1M – 5M", "USD 5M – 20M", "USD 20M+", "Prefer to discuss"],
  },
  {
    id: "timeline",
    label: "Timeline",
    options: ["Within 3 months", "3 – 6 months", "6 – 12 months", "Exploring"],
  },
  { id: "resolve", label: "What would you most like to resolve?", multiline: true, optional: true },
  { id: "introducedBy", label: "Introduced by", multiline: true, optional: true },
];

const ContactForm = () => {
  const [formState, setFormState] = useState(emptyForm);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [focused, setFocused] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [1, -1]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-1, 1]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const result = await sendEmail(formState);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Enquiry sent successfully. Our specialists will contact you shortly.",
        });
        setFormState(emptyForm);
        // Clear status after 5 seconds
        setTimeout(() => setSubmitStatus({ type: null, message: "" }), 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Failed to send enquiry. Please try again.",
        });
        setTimeout(() => setSubmitStatus({ type: null, message: "" }), 5000);
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
      setTimeout(() => setSubmitStatus({ type: null, message: "" }), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-transparent border-none outline-none py-3 font-body text-[#111111] placeholder:text-[#111111]/30 transition-all duration-300";

  return (
    <>
      <ScrollReveal className="space-y-3 text-center mb-10 md:mb-12">
        <h2 className="font-display text-4xl md:text-5xl text-[#C7A56A] leading-tight">
          Request Your Assessment
        </h2>
        <p className="font-body text-[13px] md:text-sm text-[#111111]/60 leading-relaxed">
          Our specialists will contact you within 24 hours. Please check your inbox and secondary folders.
        </p>
      </ScrollReveal>

      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, perspective: 1000 }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full"
      >
        {/* Floating Icons Wrapper (Moved further into the corner to prevent overlap) */}
        <div className="absolute top-0 left-0 w-48 h-48 -translate-x-6 xl:-translate-x-12 -translate-y-6 z-20 pointer-events-none">
          <div className="absolute inset-0 bg-[#C7A56A]/10 blur-3xl animate-pulse" />

          {/* Animated Icons - Themed in Gold/Black */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center shadow-lg transform -rotate-12 border border-[#C7A56A]/20"
          >
            <Smile className="w-5 h-5 text-[#C7A56A]" />
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0], x: [0, 4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-0 left-24 w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center shadow-lg border border-[#C7A56A]/20"
          >
            <Mail className="w-5 h-5 text-[#C7A56A]" />
          </motion.div>

          <motion.div
            animate={{ rotate: [0, -15, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-20 left-4 w-9 h-9 rounded-full bg-[#111111]/80 backdrop-blur-sm flex items-center justify-center shadow-md -rotate-12 border border-[#C7A56A]/30"
          >
            <Send className="w-4 h-4 text-[#C7A56A] transform -rotate-12" />
          </motion.div>
        </div>

        {/* The 'Bulged' Shape Container: square, with three curved corners */}
        <div
          className="relative bg-white shadow-[0_45px_100px_rgba(0,0,0,0.08)] rounded-3xl rounded-tl-none"
        // style={{
        //   clipPath: "path('M 40,0 Q 275,-15 510,0 Q 545,350 510,700 Q 275,715 40,700 Q 5,350 40,0 Z')",
        //   borderRadius: "40px 40px 40px 40px / 10px 10px 10px 10px",
        // }}
        >
          {/* Form Content */}
          <div className="relative z-10 px-8 py-10 md:px-14 md:py-12">
            <form onSubmit={handleSubmit} method="POST" className="space-y-5">
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-7">
                {fields.map((field) => {
                  const isRaised = focused === field.id || !!formState[field.id];

                  return (
                    <div key={field.id} className={`relative group ${field.multiline ? "md:col-span-2" : ""}`}>
                      {field.options ? (
                        // Non-modal so opening a menu doesn't lock the page and make it jump
                        <DropdownMenu modal={false} onOpenChange={(open) => setFocused(open ? field.id : null)}>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              aria-label={`${field.label}${formState[field.id] ? `: ${formState[field.id]}` : ""}`}
                              className={`${inputClasses} min-h-12 flex items-center justify-between gap-3 text-left cursor-pointer`}
                            >
                              <span>{formState[field.id]}</span>
                              <ChevronDown
                                className={`w-4 h-4 shrink-0 text-[#9E7A43] transition-transform duration-300 ${focused === field.id ? "rotate-180" : ""}`}
                              />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            data-lenis-prevent
                            className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-none border-[#C7A56A]/30 bg-white text-[#111111] shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                          >
                            <DropdownMenuRadioGroup
                              value={formState[field.id]}
                              onValueChange={(value) => setFormState({ ...formState, [field.id]: value })}
                            >
                              {field.options.map((option) => (
                                <DropdownMenuRadioItem
                                  key={option}
                                  value={option}
                                  className="cursor-pointer rounded-none py-2.5 font-body text-sm focus:bg-[#C7A56A]/15 focus:text-[#111111]"
                                >
                                  {option}
                                </DropdownMenuRadioItem>
                              ))}
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                          {/* Lets the browser's required check cover the menu like any other field */}
                          <input
                            required
                            tabIndex={-1}
                            aria-hidden="true"
                            value={formState[field.id]}
                            onChange={() => {}}
                            className="absolute bottom-0 left-0 w-full h-px opacity-0 pointer-events-none"
                          />
                        </DropdownMenu>
                      ) : field.multiline ? (
                        <textarea
                          name={field.id}
                          rows={2}
                          value={formState[field.id]}
                          onChange={handleChange}
                          onFocus={() => setFocused(field.id)}
                          onBlur={() => setFocused(null)}
                          className={`${inputClasses} resize-none`}
                          placeholder=" "
                        />
                      ) : (
                        <input
                          type={field.type || "text"}
                          name={field.id}
                          autoComplete="off"
                          required
                          value={formState[field.id]}
                          onChange={handleChange}
                          onFocus={() => setFocused(field.id)}
                          onBlur={() => setFocused(null)}
                          className={inputClasses}
                          placeholder=" "
                        />
                      )}
                      <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-body text-xs md:text-[13px] ${isRaised ? '-top-3 text-[#9E7A43]' : 'top-3 text-[#111111]/75'}`}>
                        {field.label} {field.optional ? <span className="opacity-75">(optional)</span> : "*"}
                      </label>
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#111111]/30">
                        <motion.div
                          animate={{ scaleX: focused === field.id ? 1 : 0 }}
                          className="h-full bg-[#C7A56A] origin-left shadow-[0_0_8px_rgba(199,165,106,0.3)]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {submitStatus.type && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className={`text-[11px] font-body tracking-wider uppercase p-3 rounded border ${
                    submitStatus.type === "success" 
                      ? "bg-green-500/10 border-green-500/20 text-green-600" 
                      : "bg-red-500/10 border-red-500/20 text-red-600"
                  }`}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <div className="pt-4 flex justify-center md:justify-start">
                <MagneticButton 
                  type="submit"
                  disabled={isSubmitting}
                  className="relative group overflow-hidden bg-[#111111] py-4 px-12 rounded-full border border-[#C7A56A]/20 transition-all duration-700"
                >
                  <span className="relative z-10 text-[10px] tracking-[0.3em] font-bold text-[#C7A56A]">
                    {isSubmitting ? "TRANSMITTING..." : "SEND REQUEST"}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-[#C7A56A]/10"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                  />
                </MagneticButton>
              </div>

              <p className="flex gap-2 font-body text-[11px] leading-relaxed text-[#111111]/60">
                <Info className="w-3.5 h-3.5 mt-[2px] shrink-0 text-[#C7A56A]" aria-hidden="true" />
                <span>
                  Details are used only to prepare your assessment and are never shared. Nothing here is an offer or solicitation, or investment, legal or tax advice.
                </span>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ContactForm;
