"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title Animation
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      });

      // Subtitle Animation
      gsap.from(subTitleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8,
      });

      // CTA Animation
      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 1.2,
      });

      // Product Floating Animation
      gsap.to(productRef.current, {
        y: -30,
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Scroll Parallax
      gsap.to(productRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 200,
        rotation: 15,
        opacity: 0.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden premium-gradient"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        <div className="flex flex-col items-start space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
              New Collection 2026
            </span>
          </motion.div>

          <h1
            ref={titleRef}
            className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase"
          >
            Carry <br />
            <span className="text-white/20 italic">Better.</span>
            <br />
            Protect Daily.
          </h1>

          <p
            ref={subTitleRef}
            className="text-lg md:text-xl text-white/60 max-w-md font-medium leading-tight"
          >
            Premium gear for the modern nomad. Engineered for those who value form as much as function.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <MagneticButton className="p-0">
              <Link
                href="/collection"
                className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-full flex items-center space-x-3 hover:bg-white/90 transition-all shadow-2xl"
              >
                <span>Shop Collection</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
            
            <MagneticButton className="p-0">
              <Link
                href="/about"
                className="px-12 py-6 text-[10px] uppercase tracking-[0.2em] font-black border border-white/10 rounded-full hover:bg-white/5 transition-all block"
              >
                Our Story
              </Link>
            </MagneticButton>
          </div>
        </div>

        <div className="relative h-[60vh] lg:h-[80vh] flex items-center justify-center">
          {/* Placeholder for 3D Product */}
          <div
            ref={productRef}
            className="relative w-full h-full flex items-center justify-center"
          >
            <div className="absolute w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-[100px] animate-pulse" />
            
            {/* Replace this with Spline or Three.js component later */}
            <div className="relative w-48 h-80 md:w-64 md:h-[450px] bg-white/10 glass rounded-[40px] border border-white/20 shadow-2xl transform rotate-15 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
                <div className="w-32 h-32 bg-white/5 rounded-full blur-2xl" />
                <span className="text-white/20 font-black text-6xl tracking-tighter uppercase transform -rotate-90">
                    NAVIOR
                </span>
            </div>

            {/* Floating UI Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -right-10 glass p-4 rounded-xl border border-white/20 shadow-xl hidden md:block"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">4.9</span>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/50">Rating</p>
                    <p className="text-xs font-bold">Premium Build</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 -left-10 glass p-4 rounded-xl border border-white/20 shadow-xl hidden md:block"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">AI</span>
                </div>
                <div>
                    <p className="text-[10px] uppercase tracking-wider text-white/50">Tech</p>
                    <p className="text-xs font-bold">Ultra Protection</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
      </div>
    </section>
  );
};

export default Hero;
