"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Zap, ShieldAlert, Sparkles } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const metrics = [
  {
    feature: "Code Quality & Architecture",
    legacy: "Bloated templates, heavy plugins & legacy PHP",
    navior: "Custom Next.js, React Native & TypeScript",
  },
  {
    feature: "Average Page / App Load Time",
    legacy: "3.5s - 5.0s (High Bounce Rate)",
    navior: "<650ms Web Load | Sub-100ms Native UI",
  },
  {
    feature: "Cross-Platform Mobile Support",
    legacy: "Slow webview wrappers & buggy hybrids",
    navior: "Native iOS & Android React Native / Swift",
  },
  {
    feature: "Security & Vulnerability Protection",
    legacy: "Plugin exploit risks & outdated dependencies",
    navior: "Bank-Grade Encryption, SSL & Edge Static Auth",
  },
  {
    feature: "SaaS Multi-Tenant Scalability",
    legacy: "Single DB monoliths struggling at scale",
    navior: "Serverless Microservices & Multi-Region PostgreSQL",
  },
  {
    feature: "Core Web Vitals & UX Jitter",
    legacy: "Red Zone scores (< 50) & high layout shift",
    navior: "98-100 PageSpeed Score & Zero CLS Jitter",
  },
];

export const ComparisonTable: React.FC = () => {
  return (
    <section id="benchmarks" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            Engineering Superiority
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Generic IT Agencies vs Navior Studios Engineering
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            See how custom software architecture outpaces generic outsourced agencies across every critical technical benchmark.
          </p>
        </div>

        {/* Comparison Table Container */}
        <GlassCard className="p-0 border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-white/10 bg-zinc-900/80">
                  <th className="py-5 px-6 text-sm font-semibold text-zinc-400 w-1/3">
                    Technical Benchmark
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-zinc-400 w-1/3 border-l border-white/10 bg-red-500/[0.02]">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <span>Generic / Off-the-Shelf Agency</span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-cyan-300 w-1/3 border-l border-cyan-500/30 bg-cyan-500/[0.08]">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                      <span>Navior Studios Engineering</span>
                      <Sparkles className="w-4 h-4 text-cyan-400 ml-auto" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                {metrics.map((m, idx) => (
                  <motion.tr
                    key={m.feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    {/* Feature Name */}
                    <td className="py-4 px-6 font-medium text-white">
                      {m.feature}
                    </td>

                    {/* Generic Agency Column */}
                    <td className="py-4 px-6 border-l border-white/10 bg-red-500/[0.02] text-zinc-400">
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center flex-shrink-0">
                          <X className="w-3 h-3 text-red-400" />
                        </div>
                        <span className="text-zinc-300">{m.legacy}</span>
                      </div>
                    </td>

                    {/* Navior Column */}
                    <td className="py-4 px-6 border-l border-cyan-500/30 bg-cyan-500/[0.04] text-white font-semibold">
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                          <Check className="w-3 h-3 text-cyan-300 stroke-[3]" />
                        </div>
                        <span className="text-cyan-200">{m.navior}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default ComparisonTable;
