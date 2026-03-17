"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const LoadingScreen = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => setLoading(false), 500);
        },
      });

      // Initial state
      gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
      gsap.set(textRef.current, { y: 20, opacity: 0 });

      // Animation sequence
      tl.to(logoRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power4.out",
      })
      .to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.6")
      .to(progressRef.current, {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
      }, "-=0.5")
      .to(containerRef.current, {
        y: "-100%",
        duration: 1,
        ease: "power4.inOut",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          ref={containerRef}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-99999 bg-black flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="relative flex flex-col items-center space-y-8">
            {/* Logo Animation */}
            <div
              ref={logoRef}
              className="w-24 h-24 bg-white text-black flex items-center justify-center text-4xl font-black rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              N
            </div>

            {/* Brand Name */}
            <div ref={textRef} className="text-center">
              <h2 className="text-2xl font-bold tracking-[0.4em] uppercase">
                Navior Studios
              </h2>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mt-2">
                Engineered for the Future
              </p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-48 h-px bg-white/10 relative overflow-hidden mt-4">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 h-full w-0 bg-white"
              />
            </div>
          </div>

          {/* Background Decorative elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
