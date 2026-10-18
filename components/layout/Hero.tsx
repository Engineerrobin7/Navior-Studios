"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Smartphone,
  Globe,
  Layers,
  Cpu,
  CheckCircle2,
  SlidersHorizontal,
  FileText,
  ShieldCheck,
  Building2,
  Award,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface HeroProps {
  onOpenAuditModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuditModal }) => {
  // Scoping Widget State
  const [projectType, setProjectType] = useState<"app" | "web" | "saas" | "custom">("app");
  const [teamScale, setTeamScale] = useState<number>(5); // Engineers
  const [timelineWeeks, setTimelineWeeks] = useState<number>(8); // Weeks

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: IBM/TCS Grade Enterprise Copy */}
          <div className="lg:col-span-7 text-left space-y-8">
            {/* Trust Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-300">
                Global IT Solution Agency &bull; ISO 27001 &amp; SOC 2 Certified
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
            >
              Global Enterprise{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-teal-200">
                IT Solutions
              </span>
              , Cloud Modernization &amp; AI Engineering.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed"
            >
              Like IBM and TCS, Navior Studios powers enterprise transformation—engineering custom software, iOS/Android mobile apps, multi-cloud architectures, and production AI platforms with 99.999% SLA reliability.
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onOpenAuditModal}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.4)] border border-blue-400/30"
              >
                <FileText className="w-5 h-5 mr-2" />
                Submit Enterprise RFP
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#solutions"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-300 hover:text-white rounded-xl border border-white/10 hover:border-white/25 bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-md transition-all duration-200"
              >
                Explore Industry Verticals
              </a>
            </motion.div>

            {/* Enterprise Certifications & Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 text-xs sm:text-sm text-slate-400"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>ISO 27001 &amp; SOC 2</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>99.999% SLA Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>24/7 Global NOC</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Scoping & RFP Matrix */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <GlassCard className="border-blue-500/30 bg-slate-900/90 p-6 sm:p-8 shadow-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/30">
                    <SlidersHorizontal className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Enterprise RFP &amp; Scope Estimator
                    </h3>
                    <p className="text-xs text-slate-400">
                      Configure your software or cloud requirements
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Interactive
                </span>
              </div>

              {/* Project Type Picker */}
              <div className="my-6 space-y-4">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Select Enterprise Service Area
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setProjectType("app")}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                      projectType === "app"
                        ? "border-blue-500 bg-blue-600/20 text-white font-semibold"
                        : "border-white/10 bg-slate-800/40 text-slate-400 hover:border-white/20"
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-blue-400" />
                    <span>Mobile Platform</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProjectType("web")}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                      projectType === "web"
                        ? "border-blue-500 bg-blue-600/20 text-white font-semibold"
                        : "border-white/10 bg-slate-800/40 text-slate-400 hover:border-white/20"
                    }`}
                  >
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>Full-Stack Web</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProjectType("saas")}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                      projectType === "saas"
                        ? "border-blue-500 bg-blue-600/20 text-white font-semibold"
                        : "border-white/10 bg-slate-800/40 text-slate-400 hover:border-white/20"
                    }`}
                  >
                    <Layers className="w-4 h-4 text-blue-400" />
                    <span>Cloud SaaS System</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProjectType("custom")}
                    className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                      projectType === "custom"
                        ? "border-blue-500 bg-blue-600/20 text-white font-semibold"
                        : "border-white/10 bg-slate-800/40 text-slate-400 hover:border-white/20"
                    }`}
                  >
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span>Enterprise AI &amp; Software</span>
                  </button>
                </div>

                {/* Team Scale Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                    <span className="font-medium text-slate-400">Dedicated Senior Engineers</span>
                    <span className="font-mono font-bold text-blue-400 text-sm">
                      {teamScale} Engineers
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    step="1"
                    value={teamScale}
                    onChange={(e) => setTeamScale(Number(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-800"
                  />
                </div>

                {/* Target Timeline */}
                <div>
                  <div className="flex justify-between items-center text-xs text-slate-300 mb-2">
                    <span className="font-medium text-slate-400">Target Delivery Sprint</span>
                    <span className="font-mono font-bold text-indigo-300 text-sm">
                      {timelineWeeks} Weeks
                    </span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="24"
                    step="2"
                    value={timelineWeeks}
                    onChange={(e) => setTimelineWeeks(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-800"
                  />
                </div>
              </div>

              {/* Scope Breakdown */}
              <div className="rounded-xl border border-blue-500/20 bg-blue-950/30 p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Execution Model:</span>
                  <span className="font-semibold text-white">Managed Agile Squad</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Compliance &amp; Security:</span>
                  <span className="font-semibold text-blue-300">SOC 2 Type II &amp; ISO 27001</span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={onOpenAuditModal}
                className="w-full mt-6 py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.35)]"
              >
                Submit RFP Scope For Analysis
                <ArrowRight className="w-4 h-4" />
              </button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
