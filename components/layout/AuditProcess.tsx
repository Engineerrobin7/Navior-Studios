"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Code2, ShieldCheck, Rocket } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface AuditProcessProps {
  onOpenAuditModal: () => void;
}

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Discovery & Solution Architecture",
    description:
      "We analyze your business objectives, technical constraints, data schemas, and user flows to produce a complete software blueprint and fixed sprint timeline.",
  },
  {
    step: "02",
    icon: Code2,
    title: "Agile Sprint Engineering",
    description:
      "Our senior engineers write clean, typed TypeScript and native code in 2-week sprints with transparent staging deployments, CI/CD pipelines, and weekly demos.",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "Security & Performance Hardening",
    description:
      "Rigorous automated QA, biometric security checks, OWASP vulnerability scanning, and load testing to guarantee sub-second response times under peak traffic.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Cloud Deployment & Ongoing Scale",
    description:
      "Seamless zero-downtime production deployment to AWS / Vercel Edge with automated monitoring, database backups, and long-term SLA maintenance.",
  },
];

export const AuditProcess: React.FC<AuditProcessProps> = ({ onOpenAuditModal }) => {
  return (
    <section id="audit-process" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            Engineering Methodology
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Our Software Delivery Pipeline
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A structured, transparent engineering process designed to deliver software on time and within budget.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <GlassCard className="h-full flex flex-col justify-between p-6 border-white/10 bg-slate-900/80">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-3xl font-extrabold text-blue-500/30">
                        {item.step}
                      </span>
                      <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20">
                        <Icon className="w-5 h-5 text-blue-400" />
                      </div>
                    </div>
                    <h3 className="font-display text-base font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Action Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <GlassCard className="max-w-4xl mx-auto border-blue-500/30 bg-gradient-to-r from-blue-950/30 via-slate-900/80 to-blue-950/30 p-8 sm:p-10">
            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Have a software or mobile app project ready to build?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl mx-auto mb-6">
              Connect directly with our lead architects at Navior Studios for a complimentary technical feasibility review.
            </p>
            <button
              onClick={onOpenAuditModal}
              className="px-8 py-4 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)]"
            >
              Schedule Solution Discovery Call
            </button>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditProcess;
