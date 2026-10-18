"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  HeartPulse,
  Truck,
  ShoppingBag,
  Cpu,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface IndustryVerticalsProps {
  onOpenAuditModal: () => void;
}

const industries = [
  {
    id: "fintech",
    name: "Banking & Financial Services",
    icon: Building2,
    tagline: "Bank-Grade Mobile Banking, Fraud Prevention & Automated Ledger Systems",
    compliance: ["PCI-DSS Level 1", "SOC 2 Type II", "AES-256 Encryption"],
    metrics: [
      { label: "Transaction Latency", value: "< 45ms" },
      { label: "Security SLA", value: "99.999%" },
      { label: "Mobile Users Served", value: "2M+" },
    ],
    solutions: [
      "Cross-Platform iOS/Android Mobile Banking Apps",
      "Real-time Automated Payment Gateway Integrations",
      "High-Throughput Microservice Ledger Architecture",
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    icon: HeartPulse,
    tagline: "HIPAA-Compliant Electronic Health Records & Telehealth Platforms",
    compliance: ["HIPAA Certified", "GDPR Health Data", "HL7 / FHIR APIs"],
    metrics: [
      { label: "HIPAA Audit Rating", value: "100%" },
      { label: "EHR Sync Speed", value: "Sub-100ms" },
      { label: "Telehealth Visits", value: "500K+" },
    ],
    solutions: [
      "Multi-Tenant EHR & EMR Management SaaS",
      "Encrypted Doctor-Patient Teleconsultation Portals",
      "Automated E-Prescription & Pharmacy Bridge",
    ],
  },
  {
    id: "logistics",
    name: "Supply Chain & Logistics",
    icon: Truck,
    tagline: "AI Route Optimization, Real-Time Fleet Tracking & Warehouse ERPs",
    compliance: ["ISO 27001", "Fleet IoT Telematics", "SOC 2"],
    metrics: [
      { label: "Fuel Cost Savings", value: "-24%" },
      { label: "Active Tracked Units", value: "50K+" },
      { label: "ERP System Uptime", value: "99.99%" },
    ],
    solutions: [
      "Automated Route Optimization & Driver Dispatch Apps",
      "Real-Time Telematics & IoT Warehouse Dashboards",
      "Custom Enterprise Resource Planning (ERP) Systems",
    ],
  },
  {
    id: "retail",
    name: "Retail & Omnichannel E-Commerce",
    icon: ShoppingBag,
    tagline: "Sub-Second Headless E-Commerce Engines for High-Volume Brands",
    compliance: ["PCI-DSS", "GDPR", "Core Web Vitals 99+"],
    metrics: [
      { label: "Page Load Speed", value: "580ms" },
      { label: "Checkout Uplift", value: "+38%" },
      { label: "Peak Black Friday Uptime", value: "100%" },
    ],
    solutions: [
      "Headless Next.js Storefronts with Global Edge CDN",
      "Real-time Inventory & Order Synchronization APIs",
      "Automated Loyalty & Customer Portal Engineering",
    ],
  },
  {
    id: "hightech",
    name: "High-Tech & SaaS Enterprises",
    icon: Cpu,
    tagline: "Scalable Multi-Tenant Cloud SaaS, LLM Integration & Microservices",
    compliance: ["SOC 2 Type II", "ISO 27001", "OWASP Top 10"],
    metrics: [
      { label: "OpEx Reduction", value: "45%" },
      { label: "Feature Release Speed", value: "4x Faster" },
      { label: "Global Edge Nodes", value: "275+" },
    ],
    solutions: [
      "Multi-Tenant SaaS Architecture & Usage Billing",
      "Custom Enterprise Generative AI & Vector Search",
      "24/7 Managed DevOps & Automated CI/CD Pipelines",
    ],
  },
];

export const IndustryVerticals: React.FC<IndustryVerticalsProps> = ({
  onOpenAuditModal,
}) => {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);

  return (
    <section id="solutions" className="py-24 relative overflow-hidden bg-slate-950/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            Enterprise Solutions By Industry
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Tailored Industry Architectures Built for Scale
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Like IBM and TCS, we deliver specialized IT solutions engineered for regulatory compliance and enterprise performance.
          </p>
        </div>

        {/* Industry Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {industries.map((ind) => {
            const Icon = ind.icon;
            const isSelected = activeIndustry.id === ind.id;
            return (
              <button
                key={ind.id}
                onClick={() => setActiveIndustry(ind)}
                className={`px-5 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/40"
                    : "border border-white/10 bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4 text-blue-400" />
                <span>{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Detail Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="border-blue-500/30 bg-slate-900/90 p-8 sm:p-10 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Overview */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-blue-600/10 border border-blue-500/30">
                      <activeIndustry.icon className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
                        Industry Vertical Solution
                      </span>
                      <h3 className="font-display text-2xl font-bold text-white">
                        {activeIndustry.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-300 text-base leading-relaxed">
                    {activeIndustry.tagline}
                  </p>

                  {/* Solutions List */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Core Enterprise Deliverables:
                    </h4>
                    {activeIndustry.solutions.map((sol) => (
                      <div key={sol} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>

                  {/* Compliance Badges */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    {activeIndustry.compliance.map((c) => (
                      <span
                        key={c}
                        className="text-[11px] font-mono px-3 py-1 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300"
                      >
                        <ShieldCheck className="w-3 h-3 inline mr-1" />
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Metrics Panel */}
                <div className="lg:col-span-5 space-y-4 p-6 rounded-2xl bg-slate-950/80 border border-white/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-white/10 pb-3">
                    Verified Performance Metrics
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {activeIndustry.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-4 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-between"
                      >
                        <span className="text-xs text-slate-300 font-medium">
                          {m.label}
                        </span>
                        <span className="font-mono font-extrabold text-lg text-blue-400">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={onOpenAuditModal}
                    className="w-full mt-4 py-3.5 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                    <span>Submit RFP for {activeIndustry.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default IndustryVerticals;
