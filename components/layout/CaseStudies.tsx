"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Globe, Layers, Shield, ArrowUpRight, CheckCircle } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface CaseStudiesProps {
  onOpenAuditModal: () => void;
}

const caseStudies = [
  {
    id: "fintech-app",
    category: "Mobile Application",
    icon: Smartphone,
    title: "OmniPay – High-Security Mobile Banking & Investment App",
    client: "Global FinTech Enterprise",
    metrics: [
      { label: "App Launch Time", value: "<120ms" },
      { label: "App Store Rating", value: "4.9 ★" },
      { label: "Active Biometric Users", value: "500K+" },
    ],
    summary:
      "Engineered a cross-platform iOS and Android mobile app featuring end-to-end encrypted biometric authentication, instant p2p transfers, and real-time portfolio analytics.",
    tags: ["React Native", "Swift", "Kotlin", "Node.js", "PostgreSQL"],
  },
  {
    id: "healthcare-saas",
    category: "Cloud SaaS Platform",
    icon: Layers,
    title: "MedPulse – Multi-Tenant Patient EHR & Telehealth Platform",
    client: "Healthcare Solutions Network",
    metrics: [
      { label: "HIPAA Compliance", value: "100%" },
      { label: "API Response Latency", value: "42ms" },
      { label: "Monthly Tele-visits", value: "120K+" },
    ],
    summary:
      "Built a secure, multi-tenant SaaS application allowing healthcare providers to manage electronic health records, video consultations, and automated automated prescriptions.",
    tags: ["Next.js 14", "TypeScript", "AWS Cloud", "GraphQL", "Docker"],
  },
  {
    id: "ecommerce-web",
    category: "Full-Stack Web Engine",
    icon: Globe,
    title: "LuxeSpace – Sub-Second Headless Commerce Web Platform",
    client: "High-Growth Lifestyle Brand",
    metrics: [
      { label: "PageSpeed Index", value: "99 / 100" },
      { label: "Page Load Time", value: "580ms" },
      { label: "Conversion Uplift", value: "+38%" },
    ],
    summary:
      "Modernized a slow legacy monolith into an ultra-fast headless Next.js e-commerce engine with edge network caching and zero layout shift.",
    tags: ["Next.js", "Tailwind CSS", "Shopify Storefront API", "Vercel Edge"],
  },
  {
    id: "enterprise-erp",
    category: "Custom Software",
    icon: Shield,
    title: "LogiFlow – AI-Powered Supply Chain & Fleet Management",
    client: "Enterprise Logistics Operator",
    metrics: [
      { label: "Operational Overhead", value: "-28%" },
      { label: "Real-time Vehicle Tracking", value: "10K+ Units" },
      { label: "Uptime SLA", value: "99.99%" },
    ],
    summary:
      "Designed custom enterprise logistics software connecting IoT telematics, route optimization algorithms, and automated driver dispatch systems.",
    tags: ["Python", "FastAPI", "React", "Kubernetes", "PostgreSQL"],
  },
];

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenAuditModal }) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredStudies =
    activeTab === "all"
      ? caseStudies
      : caseStudies.filter((c) => c.category.toLowerCase().includes(activeTab));

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            Featured Engineering Case Studies
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Real Software Systems Delivered for Real Clients
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A glimpse into how we transform complex business requirements into high-performing digital applications.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "all", label: "All Engineering" },
              { id: "mobile", label: "Mobile Apps" },
              { id: "saas", label: "SaaS Systems" },
              { id: "web", label: "Web Platforms" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : "border border-white/10 bg-slate-900/60 text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {filteredStudies.map((study) => {
              const Icon = study.icon;
              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard className="h-full flex flex-col justify-between group border-white/10 bg-slate-900/80 hover:border-blue-500/30">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-blue-600/10 border border-blue-500/20">
                            <Icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">
                            {study.category}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          {study.client}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                        {study.title}
                      </h3>

                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                        {study.summary}
                      </p>

                      {/* Metrics Showcase */}
                      <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-white/5 mb-6 text-center">
                        {study.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="font-mono font-extrabold text-blue-400 text-sm sm:text-base">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-slate-400 uppercase tracking-tight">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {study.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-800/80 border border-white/10 text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <button
                      onClick={onOpenAuditModal}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors pt-4 border-t border-white/10"
                    >
                      <span>Request Similar Solution Architecture</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </GlassCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
