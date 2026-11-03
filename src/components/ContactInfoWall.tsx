"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, MapPin, Clock } from "lucide-react";

const contactDetails = [
  {
    id: "email",
    label: "EMAIL",
    value: "raghunath@pearlrealty.ae",
    icon: Mail,
    href: "mailto:raghunath@pearlrealty.ae",
  },
  {
    id: "phone",
    label: "PHONE",
    value: "+971 58 592 6469",
    icon: Phone,
    href: "tel:+971585926469",
  },
  {
    id: "whatsapp",
    label: "WHATSAPP",
    value: "Priority Direct Chat",
    icon: MessageSquare,
    href: "https://wa.me/971585926469",
  },
  {
    id: "location",
    label: "LOCATION",
    value: "DIFC, Dubai UAE",
    icon: MapPin,
    href: "#",
  },
  {
    id: "hours",
    label: "PRIVATE HOURS",
    value: "Mon - Sat | By Appointment",
    icon: Clock,
    href: "#",
  },
];

const ContactInfoWall = () => {
  return (
    <div className="w-full grid sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-5 gap-3">
      {contactDetails.map((detail, index) => (
        <motion.a
          key={detail.id}
          href={detail.href}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          whileHover={{ y: -6 }}
          className="group relative flex flex-col py-4 sm:py-5 px-5 overflow-hidden transition-all sm:last:col-span-2 lg:col-span-2 lg:[&:nth-child(4)]:col-span-3 lg:last:col-span-3 xl:!col-span-1"
        >
          {/* Sculpted Panel Background (Layered Strips) */}
          <div className="absolute inset-0 bg-[#111111]/[0.02] border-l-2 border-transparent group-hover:border-[#C7A56A] group-hover:bg-[#C7A56A]/[0.05] transition-all duration-500" />
          
          {/* Thin Gold Divider */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#C7A56A]/30 via-[#C7A56A]/10 to-transparent" />
          
          {/* Floating Gold Glow Line (Expands on Hover) */}
          <motion.div 
            className="absolute bottom-0 left-0 h-[2px] bg-[#C7A56A] shadow-[0_0_15px_rgba(199,165,106,0.8)]"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />

          <div className="relative z-10 flex items-center justify-between sm:flex-col-reverse sm:items-start sm:justify-start gap-3">
            <div className="space-y-1">
              <span className="block font-body text-[9px] tracking-[0.3em] font-bold text-[#111111]/50 group-hover:text-[#C7A56A] transition-colors duration-300">
                {detail.label}
              </span>
              <span className="block font-display text-base text-[#111111] break-words group-hover:text-[#9E7A43] transition-colors duration-300">
                {detail.value}
              </span>
            </div>
            
            <div className="w-10 h-10 sm:-ml-3 flex items-center justify-center rounded-full border border-transparent group-hover:border-[#C7A56A]/20 transition-all duration-500">
              <detail.icon className="w-4 h-4 text-[#C7A56A] group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default ContactInfoWall;
