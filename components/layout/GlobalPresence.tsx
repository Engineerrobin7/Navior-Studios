"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, MapPin, Clock, ShieldCheck, CheckCircle2, Server } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const locations = [
  {
    region: "North America (Americas Headquarters)",
    city: "New York, USA",
    role: "Strategic Client Relations & Executive Architecture Advisory",
    hours: "24/7 NOC Coverage",
  },
  {
    region: "Asia-Pacific (Regional Engineering Hub)",
    city: "Chandigarh / Mohali IT Park",
    role: "Core Full-Stack Software, Cloud Engineering & R&D Center",
    hours: "24/7 Development & Operations",
  },
  {
    region: "Europe (EMEA Hub)",
    city: "London, United Kingdom",
    role: "Enterprise Solutions & EU Compliance Advisory",
    hours: "24/7 Managed Services",
  },
];

export const GlobalPresence: React.FC = () => {
  return (
    <section id="global-presence" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            Global Delivery Model (GDM)
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            24/7 Global Engineering Operations &amp; Delivery Centers
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Combining global strategic advisory with dedicated regional engineering hubs for continuous 24/7 software development and SLA support.
          </p>
        </div>

        {/* Global Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <GlassCard className="h-full flex flex-col justify-between border-white/10 bg-slate-900/80 hover:border-blue-500/30">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-xs font-mono font-bold text-blue-300 uppercase tracking-wide">
                      {loc.region}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {loc.city}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {loc.role}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    {loc.hours}
                  </span>
                  <span>Active Hub</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Mega Enterprise Trust Banner */}
        <GlassCard className="border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-slate-900/90 to-blue-950/40 p-8 sm:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="space-y-1">
              <div className="font-mono text-3xl font-extrabold text-blue-400">500+</div>
              <div className="text-xs text-slate-300 uppercase tracking-wider">Enterprise Builds</div>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-mono text-3xl font-extrabold text-emerald-400">99.999%</div>
              <div className="text-xs text-slate-300 uppercase tracking-wider">SLA Infrastructure Uptime</div>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-mono text-3xl font-extrabold text-indigo-400">ISO 27001</div>
              <div className="text-xs text-slate-300 uppercase tracking-wider">SOC 2 Type II Certified</div>
            </div>
            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-mono text-3xl font-extrabold text-blue-300">24/7/365</div>
              <div className="text-xs text-slate-300 uppercase tracking-wider">Dedicated NOC Support</div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default GlobalPresence;
