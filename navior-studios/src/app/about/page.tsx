"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll parallax for text
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -150,
        opacity: 0.2,
      });

      // Reveal animations for story sections
      gsap.utils.toArray(".story-section").forEach((section) => {
        const el = section as HTMLElement;
        gsap.from(el, {
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section ref={heroRef} className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-transparent opacity-30" />
        <div ref={textRef} className="text-center z-10 px-6">
            <span className="text-xs uppercase tracking-[0.6em] font-black text-white/20 mb-10 block">
                The Philosophy
            </span>
            <h1 className="text-8xl md:text-[14rem] font-black tracking-tighter leading-none uppercase">
                Future <br />
                <span className="text-white/5 italic">Studios.</span>
            </h1>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-4xl pb-40">
        <div className="story-section space-y-12 mb-40">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">We believe in weightless <br />protection.</h2>
            <div className="space-y-8 text-xl text-white/40 leading-relaxed font-light">
                <p>
                    Navior Studios was born from a simple observation: most protective cases feel like a burden. 
                    They add bulk, hide design, and ruin the ergonomics of the devices we love.
                </p>
                <p>
                    Our mission is to engineer protection that feels like it&apos;s not even there. 
                    Using advanced materials like Aramid fiber, aerospace titanium, and liquid obsidian, 
                    we&apos;ve created a range of gear that defies the laws of traditional design.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-40">
            <div className="story-section space-y-6">
                <span className="text-xs uppercase tracking-widest font-bold text-white/20">01 / Design</span>
                <h3 className="text-3xl font-bold tracking-tight">Engineered to 0.01mm.</h3>
                <p className="text-white/40 leading-relaxed">
                    Every curve and cutout is calculated to provide a seamless fit. 
                    We don&apos;t just make cases; we make extensions of your gear.
                </p>
            </div>
            <div className="story-section space-y-6 pt-20 md:pt-40">
                <span className="text-xs uppercase tracking-widest font-bold text-white/20">02 / Performance</span>
                <h3 className="text-3xl font-bold tracking-tight">Extreme Durability.</h3>
                <p className="text-white/40 leading-relaxed">
                    Tested in real-world scenarios, from high-altitude drops to daily urban impacts. 
                    Navior gear is built to outlast your device.
                </p>
            </div>
        </div>

        <div className="story-section glass p-16 md:p-32 rounded-[60px] border border-white/10 text-center space-y-12">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10">
                <span className="text-2xl font-black">N</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">The Future is <br />Weightless.</h2>
            <p className="text-white/40 max-w-xl mx-auto uppercase tracking-[0.2em] text-sm leading-relaxed font-bold">
                Join us in the pursuit of elevated protection.
            </p>
            <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-full hover:scale-105 transition-transform">
                View Collection
            </button>
        </div>
      </div>

      <footer className="py-20 border-t border-white/5 text-center text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">
        © 2026 Navior Studios. Engineered for the future.
      </footer>
    </main>
  );
};

export default AboutPage;
