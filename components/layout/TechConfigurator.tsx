"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  Server,
  Smartphone,
  Globe,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Download,
  Lock,
  Sparkles,
  Zap,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface TechConfiguratorProps {
  onOpenAuditModal: () => void;
}

export const TechConfigurator: React.FC<TechConfiguratorProps> = ({
  onOpenAuditModal,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [infra, setInfra] = useState<string>("Legacy Monolith (PHP/WordPress)");
  const [objective, setObjective] = useState<string>("Mobile Application (iOS & Android)");
  const [scaleUsers, setScaleUsers] = useState<string>("10,000 - 100,000 Active Users");
  const [compliance, setCompliance] = useState<string>("SOC2 & Standard Encryption");

  const [downloadedPdf, setDownloadedPdf] = useState(false);

  const handleDownloadPdf = () => {
    setDownloadedPdf(true);
    // Create a Blob representing the dynamic architectural PDF blueprint
    const textContent = `
===================================================================
NAVIOR STUDIOS - ENTERPRISE ARCHITECTURAL SPECIFICATION & BLUEPRINT
===================================================================
Target Domain: naviorstudios.store
Generated for: Enterprise Technology Scoping Discovery

1. CURRENT ARCHITECTURE PROFILE:
   - Baseline Infrastructure: ${infra}
   - Scale Target: ${scaleUsers}
   - Compliance Standard: ${compliance}

2. RECOMMENDED TECHNICAL STACK:
   - Frontend Engine: Next.js 14 App Router + React Native (Cross-Platform Mobile)
   - Backend Gateway: Python FastAPI Engine (Pydantic v2 Type Scrubbing)
   - Database Layer: Managed PostgreSQL 16 (Multi-AZ Transactional ORM)
   - Infrastructure: AWS ECS Fargate + Vercel Global Edge Network

3. ESTIMATED PERFORMANCE & OPEX OUTCOMES:
   - Estimated Load Time: < 650ms (Sub-Second LCP)
   - Projected Cloud OpEx Reduction: ~ 42% Cost Savings
   - Delivery Sprint Timeline: 8 - 12 Weeks (Dedicated Squad)

4. NEXT STEPS:
   - Connect directly with Navior Studios Solution Architects
   - Access Sandbox Operations Hub: https://naviorstudios.store/portal
===================================================================
    `;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Navior_Studios_Architecture_Blueprint.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section id="configurator" className="py-24 relative overflow-hidden bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            Interactive Scoping Tool
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            The Interactive Tech Stack Configurator
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Configure your technical requirements to generate an instant architectural specification and cloud cost blueprint.
          </p>
        </div>

        {/* Configurator Card Container */}
        <GlassCard className="max-w-4xl mx-auto border-blue-500/30 bg-slate-900/90 p-6 sm:p-10 shadow-2xl">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
              <span className={step === 1 ? "text-blue-400 font-bold" : "text-slate-500"}>
                01. Infrastructure
              </span>
              <span className={step === 2 ? "text-blue-400 font-bold" : "text-slate-500"}>
                02. Project Goal
              </span>
              <span className={step === 3 ? "text-blue-400 font-bold" : "text-slate-500"}>
                03. Scale &amp; Compliance
              </span>
              <span className={step === 4 ? "text-blue-400 font-bold" : "text-slate-500"}>
                04. Blueprint Output
              </span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 rounded-full"
                animate={{
                  width:
                    step === 1 ? "25%" : step === 2 ? "50%" : step === 3 ? "75%" : "100%",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: CURRENT INFRASTRUCTURE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Step 1: What is your current technical architecture?
                  </h3>
                  <p className="text-xs text-slate-400">
                    Select the baseline system environment you are operating today.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Legacy Monolith (PHP/WordPress)", desc: "Heavy plugins, slow response times, monolithic SQL." },
                    { title: "Hybrid Cloud Infrastructure", desc: "Mixed legacy backends with partial cloud services." },
                    { title: "Greenfield Startup / New Build", desc: "Building brand new software or mobile product from scratch." },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.title}
                      onClick={() => setInfra(item.title)}
                      className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        infra === item.title
                          ? "border-blue-500 bg-blue-600/20 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                          : "border-white/10 bg-slate-950/60 text-slate-400 hover:border-white/20"
                      }`}
                    >
                      <div>
                        <Server className="w-5 h-5 text-blue-400 mb-3" />
                        <div className="font-bold text-sm text-white mb-1">{item.title}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                      </div>
                      {infra === item.title && (
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mt-4 self-end" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                  >
                    <span>Next: Primary Goal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PRIMARY GOAL */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Step 2: What is your primary project objective?
                  </h3>
                  <p className="text-xs text-slate-400">
                    Choose the core software deliverable for your organization.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Mobile Application (iOS & Android)", icon: Smartphone, desc: "React Native / Swift cross-platform native app." },
                    { title: "Sub-Second Next.js Web Platform", icon: Globe, desc: "Ultra-fast headless commerce & web application." },
                    { title: "Multi-Tenant Cloud SaaS System", icon: Layers, desc: "Subscription billing, role-based auth, multi-tenant DB." },
                    { title: "Custom Enterprise Software & AI", icon: Cpu, desc: "Bespoke business workflows, microservices & LLMs." },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        type="button"
                        key={item.title}
                        onClick={() => setObjective(item.title)}
                        className={`p-5 rounded-2xl border text-left transition-all flex items-start justify-between gap-4 ${
                          objective === item.title
                            ? "border-blue-500 bg-blue-600/20 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                            : "border-white/10 bg-slate-950/60 text-slate-400 hover:border-white/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-white mb-1">{item.title}</div>
                            <div className="text-xs text-slate-400">{item.desc}</div>
                          </div>
                        </div>
                        {objective === item.title && (
                          <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                  >
                    <span>Next: Scale &amp; Security</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: SCALE & COMPLIANCE */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    Step 3: What is your target active scale &amp; compliance?
                  </h3>
                  <p className="text-xs text-slate-400">
                    Define active user metrics and required regulatory frameworks.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Target Active Users / Scale
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        "1,000 - 10,000 Users",
                        "10,000 - 100,000 Active Users",
                        "100,000 - 1M+ Active Users",
                      ].map((sc) => (
                        <button
                          type="button"
                          key={sc}
                          onClick={() => setScaleUsers(sc)}
                          className={`p-3.5 rounded-xl border text-xs font-medium transition-all ${
                            scaleUsers === sc
                              ? "border-blue-500 bg-blue-600/20 text-white font-bold"
                              : "border-white/10 bg-slate-950/60 text-slate-400"
                          }`}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Security &amp; Regulatory Compliance Standard
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        "SOC2 & Standard Encryption",
                        "HIPAA Medical Compliance",
                        "PCI-DSS Financial Security",
                      ].map((cmp) => (
                        <button
                          type="button"
                          key={cmp}
                          onClick={() => setCompliance(cmp)}
                          className={`p-3.5 rounded-xl border text-xs font-medium transition-all ${
                            compliance === cmp
                              ? "border-blue-500 bg-blue-600/20 text-white font-bold"
                              : "border-white/10 bg-slate-950/60 text-slate-400"
                          }`}
                        >
                          {cmp}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-3 rounded-xl border border-white/10 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                    <span>Generate Architectural Spec</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: AUTOMATED BLUEPRINT OUTPUT */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5 mb-1">
                      <Zap className="w-3.5 h-3.5 fill-emerald-400" />
                      Architectural Blueprint Generated
                    </span>
                    <h3 className="font-display text-2xl font-bold text-white">
                      Recommended Engineering Specification
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-mono">
                    Navior Spec v2.0
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
                    <div className="text-slate-400 uppercase font-bold tracking-wider">
                      Target Stack Architecture:
                    </div>
                    <div className="text-white font-semibold">{objective}</div>
                    <div className="text-blue-300 font-mono text-[11px]">
                      Next.js 14 App Router + Python FastAPI + PostgreSQL 16
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
                    <div className="text-slate-400 uppercase font-bold tracking-wider">
                      Target Scale &amp; Compliance:
                    </div>
                    <div className="text-white font-semibold">{scaleUsers}</div>
                    <div className="text-emerald-400 font-mono text-[11px]">
                      {compliance} Enforced
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
                    <div className="text-slate-400 uppercase font-bold tracking-wider">
                      Estimated Sprint Delivery:
                    </div>
                    <div className="text-white font-semibold">8 - 12 Weeks Sprints</div>
                    <div className="text-slate-300">Dedicated Agile Squad</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
                    <div className="text-slate-400 uppercase font-bold tracking-wider">
                      Projected Cloud Savings:
                    </div>
                    <div className="text-emerald-400 font-mono text-base font-bold">
                      ~ 42% OpEx Reduction
                    </div>
                    <div className="text-slate-400">AWS Serverless Fargate Migration</div>
                  </div>
                </div>

                {/* Actions Group */}
                <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={handleDownloadPdf}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-blue-500/40 bg-blue-600/20 hover:bg-blue-600/30 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4 text-blue-400" />
                    <span>{downloadedPdf ? "Spec Blueprint Downloaded!" : "Download PDF Architectural Spec"}</span>
                  </button>

                  <a
                    href="/portal"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/10 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Lock className="w-4 h-4 text-blue-400" />
                    <span>Preview Client Portal Sandbox</span>
                  </a>

                  <button
                    onClick={onOpenAuditModal}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] sm:ml-auto"
                  >
                    <span>Schedule Discovery Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      </div>
    </section>
  );
};

export default TechConfigurator;
