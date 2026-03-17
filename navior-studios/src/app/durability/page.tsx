"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Target, Zap, Waves } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const DurabilityPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [impactPoints, setImpactPoints] = useState<{ top: string; left: string }[]>([]);

  useEffect(() => {
    const points = [1, 2, 3, 4].map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setImpactPoints(points);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating Physics Animation
      gsap.to(elementRef.current, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        rotation: "random(-10, 10)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Reveal animations for features
      gsap.from(".feature-card", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features-grid",
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <Navbar />

      <div ref={containerRef} className="pt-32 pb-20 container mx-auto px-6">
        <header className="mb-32 text-center space-y-8">
            <span className="text-xs uppercase tracking-[0.5em] font-bold text-white/30">
                The Science of Protection
            </span>
            <h1 className="text-7xl md:text-[10rem] font-bold tracking-tighter leading-none">
                Tested. <br />
                <span className="text-white/10 italic">Proven.</span>
            </h1>
        </header>

        <div className="relative h-[60vh] flex items-center justify-center mb-40">
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/5 to-transparent blur-3xl opacity-30" />
            
            <div
                ref={elementRef}
                className="relative w-64 h-[450px] bg-white/10 glass rounded-[50px] border border-white/20 shadow-2xl flex items-center justify-center"
            >
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent" />
                <div className="w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                <div className="text-center space-y-4">
                    <Shield size={64} strokeWidth={1} className="mx-auto text-white/40" />
                    <p className="text-[10px] uppercase tracking-widest font-black text-white/20">Titanium Grade</p>
                </div>
                
                {/* Floating "Impact" points */}
                {impactPoints.map((point, i) => (
                    <div
                        key={i}
                        className={`absolute w-3 h-3 bg-white/40 rounded-full blur-sm animate-pulse`}
                        style={{
                            top: point.top,
                            left: point.left,
                        }}
                    />
                ))}
            </div>

            <div className="absolute top-1/2 left-0 w-full flex justify-between items-center pointer-events-none px-4 lg:px-20">
                <div className="text-left space-y-2 opacity-40">
                    <p className="text-6xl font-black tracking-tighter">15FT</p>
                    <p className="text-xs uppercase tracking-widest font-bold">Drop Tested</p>
                </div>
                <div className="text-right space-y-2 opacity-40">
                    <p className="text-6xl font-black tracking-tighter">MIL-STD</p>
                    <p className="text-xs uppercase tracking-widest font-bold">810G Certified</p>
                </div>
            </div>
        </div>

        <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-40">
            {[
                { icon: Shield, title: "Aramid Fiber", desc: "5x stronger than steel, yet weightless." },
                { icon: Zap, title: "Impact Core", desc: "Absorbs 99% of drop kinetic energy." },
                { icon: Waves, title: "Nano-Coat", desc: "Repels water, oil, and daily scratches." },
                { icon: Target, title: "Precision Fit", desc: "Engineered to 0.01mm accuracy." }
            ].map((feature, i) => (
                <div key={i} className="feature-card glass p-10 rounded-3xl border border-white/10 space-y-6 hover:border-white/20 transition-all group">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <feature.icon size={24} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-bold uppercase tracking-tight text-lg">{feature.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                    </div>
                </div>
            ))}
        </div>

        <section className="py-40 text-center space-y-12 glass rounded-[60px] border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full scale-150" />
            <div className="relative z-10 space-y-8">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Built for the <br />Unpredictable.</h2>
                <p className="text-white/40 max-w-xl mx-auto uppercase tracking-widest text-sm leading-relaxed font-medium">
                    Our materials are sourced from aerospace engineering to provide 
                    the ultimate balance between weight and protection.
                </p>
                <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-full hover:scale-105 transition-transform">
                    Explore Technology
                </button>
            </div>
        </section>
      </div>

      <footer className="py-20 border-t border-white/5 text-center text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">
        © 2026 Navior Studios. Engineered for the future.
      </footer>
    </main>
  );
};

export default DurabilityPage;
