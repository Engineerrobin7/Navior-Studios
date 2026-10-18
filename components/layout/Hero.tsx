"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Terminal,
  Activity,
  Server,
  Zap,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface HeroProps {
  onOpenAuditModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuditModal }) => {
  // Terminal Telemetry Logs
  const [logs, setLogs] = useState<string[]>([
    "[SYS] Initializing Navior Global Edge Nodes...",
    "[AWS-US-EAST-1] Connected -> Latency: 11ms",
    "[POSTGRES] Multi-AZ Connection Pool: Active (45/50)",
    "[SECURITY] ISO 27001 & SOC2 Encryption Protocol Verified",
  ]);

  const [activeWidgetTab, setActiveWidgetTab] = useState<"terminal" | "scoper">("terminal");

  // Scoper state
  const [projectType, setProjectType] = useState<"app" | "web" | "saas" | "custom">("app");
  const [teamScale, setTeamScale] = useState<number>(5);
  const [timelineWeeks, setTimelineWeeks] = useState<number>(8);

  // Simulated live log ticker
  useEffect(() => {
    const logInterval = setInterval(() => {
      const sampleLogs = [
        `[EDGE-EU-WEST] TLS 1.3 Handshake completed (${Math.floor(Math.random() * 15 + 10)}ms)`,
        `[FASTAPI-GATEWAY] GET /api/v2/projects -> 200 OK (${Math.floor(Math.random() * 10 + 5)}ms)`,
        `[REDIS-CACHE] Memory Hit Ratio: ${(99.2 + Math.random() * 0.7).toFixed(2)}%`,
        `[CI/CD-BUILD] Automated Deployment Verified -> Pipeline Passed`,
      ];
      const randomLog = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
      setLogs((prev) => [...prev.slice(-3), randomLog]);
    }, 4000);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: IBM/TCS/Accenture Grade Enterprise Headline & Value Prop */}
          <div className="lg:col-span-7 text-left space-y-8">
            {/* Trust Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(37,99,235,0.2)]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-300">
                Global Enterprise IT Solutions Agency &bull; ISO 27001 Certified
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-200 drop-shadow-[0_0_25px_rgba(37,99,235,0.35)]">
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
              Navior Studios delivers the enterprise reliability of IBM and TCS paired with modern serverless velocity—engineering custom software, iOS/Android apps, and multi-cloud architectures with 99.999% SLA uptime.
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
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-all duration-300 shadow-[0_0_25px_rgba(37,99,235,0.4)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] border border-blue-400/40 glow-border"
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

            {/* Enterprise Highlights Ticker Bar */}
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

          {/* Right Column: Live Interactive Enterprise Telemetry Terminal & Scoper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <GlassCard className="border-blue-500/30 bg-slate-950/90 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Tab Selector Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveWidgetTab("terminal")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      activeWidgetTab === "terminal"
                        ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Live Telemetry</span>
                  </button>

                  <button
                    onClick={() => setActiveWidgetTab("scoper")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      activeWidgetTab === "scoper"
                        ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>RFP Scoper</span>
                  </button>
                </div>

                <span className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live System
                </span>
              </div>

              {/* WIDGET TAB 1: LIVE INFRASTRUCTURE TELEMETRY TERMINAL */}
              {activeWidgetTab === "terminal" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono border-b border-white/5 pb-2">
                    <span>Cluster: navior-global-east-1</span>
                    <span className="text-blue-400 font-bold">AWS + Vercel Edge</span>
                  </div>

                  {/* Terminal Log Console */}
                  <div className="terminal-window p-4 rounded-xl space-y-2 text-[11px] font-mono leading-relaxed min-h-[220px]">
                    <div className="text-slate-500 border-b border-white/5 pb-2 flex items-center justify-between">
                      <span>// NAVIOR REAL-TIME SYSTEM ENGINE LOGS</span>
                      <Activity className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                    </div>
                    {logs.map((log, i) => (
                      <motion.div
                        key={i + log}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={
                          log.includes("ERR")
                            ? "text-red-400"
                            : log.includes("AWS") || log.includes("POSTGRES")
                            ? "text-blue-300"
                            : log.includes("OK") || log.includes("Passed")
                            ? "text-emerald-400"
                            : "text-slate-300"
                        }
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>

                  {/* Live Stats Gauge Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                      <div className="text-[10px] text-slate-400 uppercase">Avg Response</div>
                      <div className="font-bold text-blue-400 text-sm">12ms</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                      <div className="text-[10px] text-slate-400 uppercase">SLA Uptime</div>
                      <div className="font-bold text-emerald-400 text-sm">99.999%</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-white/5">
                      <div className="text-[10px] text-slate-400 uppercase">Active Nodes</div>
                      <div className="font-bold text-indigo-300 text-sm">275+ Edge</div>
                    </div>
                  </div>

                  <button
                    onClick={onOpenAuditModal}
                    className="w-full mt-4 py-3 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.35)]"
                  >
                    <span>Request Cloud Architecture Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* WIDGET TAB 2: RFP SCOPER */}
              {activeWidgetTab === "scoper" && (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Select Service Area
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "app", name: "Mobile Platform", icon: Smartphone },
                        { id: "web", name: "Full-Stack Web", icon: Globe },
                        { id: "saas", name: "Cloud SaaS", icon: Layers },
                        { id: "custom", name: "Enterprise AI", icon: Cpu },
                      ].map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setProjectType(item.id as any)}
                            className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                              projectType === item.id
                                ? "border-blue-500 bg-blue-600/20 text-white font-semibold"
                                : "border-white/10 bg-slate-900/60 text-slate-400 hover:border-white/20"
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5 text-blue-400" />
                            <span>{item.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-xs text-slate-300 mb-1">
                        <span>Dedicated Engineers</span>
                        <span className="font-mono font-bold text-blue-400">{teamScale} Engineers</span>
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

                    <div>
                      <div className="flex justify-between items-center text-xs text-slate-300 mb-1">
                        <span>Delivery Sprint</span>
                        <span className="font-mono font-bold text-indigo-300">{timelineWeeks} Weeks</span>
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

                  <button
                    onClick={onOpenAuditModal}
                    className="w-full mt-4 py-3.5 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.35)]"
                  >
                    <span>Submit RFP Scope For Analysis</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
