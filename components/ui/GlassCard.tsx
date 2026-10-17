"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverGlow = true,
  ...props
}) => {
  return (
    <motion.div
      whileHover={
        hoverGlow
          ? {
              y: -3,
              borderColor: "rgba(37, 99, 235, 0.35)",
              boxShadow: "0 14px 40px -10px rgba(37, 99, 235, 0.2)",
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : undefined
      }
      className={cn(
        "relative rounded-2xl border border-white/10 bg-[#0f172a]/70 backdrop-blur-md p-6 sm:p-8 transition-all duration-300 overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Subtle top inner highlight line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};

export default GlassCard;
