"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import axios from "axios";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post("/api/newsletter", { email });
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      
      {/* Featured Collection Section */}
      <section className="py-40 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
          <div className="space-y-6">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/30">
              The Essentials
            </span>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
              Daily <br />
              <span className="text-white/10 italic">Essentials.</span>
            </h2>
          </div>
          <p className="text-white/40 max-w-xs text-xs leading-relaxed uppercase tracking-widest font-bold">
            Curated protection for the modern minimalist. Designed in Mumbai, built for the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Titan Shield Pro", price: 2499, cat: "Cases" },
            { name: "Lunar Magsafe", price: 1899, cat: "Power" },
            { name: "Obsidian Buds", price: 6999, cat: "Audio" }
          ].map((prod, i) => (
            <div key={i} className="group relative bg-[#111111] rounded-[32px] border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20">
              <div className="aspect-square bg-[#1a1a1a] flex items-center justify-center p-12 overflow-hidden">
                <div className="w-full h-full bg-white/5 rounded-3xl border border-white/5 group-hover:scale-110 transition-transform duration-700 shadow-2xl flex items-center justify-center">
                  <span className="text-white/5 font-black text-4xl uppercase select-none">NAVIOR</span>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30">{prod.cat}</p>
                  <h3 className="text-2xl font-black tracking-tight uppercase">{prod.name}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/30 line-through">₹{(prod.price * 1.2).toFixed(0)}</span>
                    <span className="text-2xl font-black tracking-tighter">₹{prod.price.toLocaleString('en-IN')}</span>
                  </div>
                  <button className="px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white/90 transition-all shadow-xl active:scale-95">
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Gallery Section */}
      <section className="py-40 border-t border-white/5 bg-[#050505]">
        <div className="container mx-auto px-6 space-y-20">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/30">
                Community
              </span>
              <h2 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8]">
                Join the <br />
                <span className="text-white/10 italic">Lab.</span>
              </h2>
            </div>
            <p className="text-white/40 max-w-xs text-xs leading-relaxed uppercase tracking-widest font-bold">
              Follow us @naviorstudios. Share your daily carry and get featured.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group relative aspect-square bg-[#111111] rounded-[32px] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500">
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/5 font-black text-4xl uppercase select-none group-hover:scale-110 transition-transform duration-700">
                    LIFESTYLE 0{i}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-[8px] uppercase tracking-[0.3em] font-black text-white/60">@navior_user_{i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-40 bg-white text-black">
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <div className="space-y-6">
                    <span className="text-[10px] uppercase tracking-[0.5em] font-black text-black/30">
                        Stay Connected
                    </span>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                        Join the <br />
                        <span className="text-black/20 italic">Drop List.</span>
                    </h2>
                    <p className="text-black/60 max-w-md mx-auto text-sm font-bold uppercase tracking-widest leading-relaxed">
                        Be the first to know about new gear drops, laboratory experiments, and limited editions.
                    </p>
                </div>

                <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center gap-4 max-w-2xl mx-auto">
                    <input 
                        type="email" 
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-black/5 border border-black/10 rounded-full py-6 px-10 text-sm font-bold focus:outline-none focus:border-black/30 transition-all placeholder:text-black/20"
                    />
                    <button 
                      disabled={loading}
                      className="w-full md:w-auto px-12 py-6 bg-black text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-full hover:scale-105 transition-transform shadow-2xl disabled:opacity-50"
                    >
                      {loading ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>

                {status === "success" && (
                  <p className="text-[10px] uppercase tracking-widest font-black text-emerald-500">
                    Welcome to the list. You&apos;re in.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-[10px] uppercase tracking-widest font-black text-rose-500">
                    Something went wrong. Try again.
                  </p>
                )}

                <p className="text-[10px] uppercase tracking-widest font-black text-black/20">
                    No spam. Just high-grade updates.
                </p>
            </div>
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="py-20 border-t border-white/5 text-center text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold bg-black">
        © 2026 Navior Studios. Engineered for the future.
      </footer>
    </main>
  );
}
