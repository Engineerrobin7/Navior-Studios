"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Target, ShieldCheck, ArrowRight, Check } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface EngagementModelsProps {
  onOpenAuditModal: () => void;
}

const models = [
  {
    icon: Users,
    title: "Dedicated Engineering Squads",
    subtitle: "Scale your development capacity with fully-managed, cross-functional engineering teams.",
    highlights: [
      "Full-stack developers, mobile engineers & QA",
      "Direct Slack/Jira integration with your workflow",
      "Flexible monthly sprint commitments",
      "Full IP ownership & code repository access",
    ],
    badge: "Most Flexible",
  },
  {
    icon: Target,
    title: "Turnkey Fixed-Scope Delivery",
    subtitle: "End-to-end software project development with guaranteed milestones and fixed timelines.",
    highlights: [
      "Complete product discovery & UI/UX prototyping",
      "Milestone-based architecture delivery",
      "60-day post-launch warranty & SLA support",
      "Dedicated Project Manager & Solution Architect",
    ],
    badge: "Fixed Timeline",
  },
  {
    icon: ShieldCheck,
    title: "Legacy Modernization & CTO Advisory",
    subtitle: "Surgical refactoring of legacy applications, cloud migration, and performance audits.",
    highlights: [
      "In-depth security & performance vulnerability audit",
      "Zero-downtime database & cloud migration",
      "Core Web Vitals & sub-second latency engineering",
      "Fractional CTO & system architecture guidance",
    ],
    badge: "Enterprise",
  },
];

export const EngagementModels: React.FC<EngagementModelsProps> = ({
  onOpenAuditModal,
}) => {
  return (
    <section id="engagement" className="py-24 relative overflow-hidden bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            Flexible Collaboration Models
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            How We Partner With Businesses
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Choose the engagement model that best aligns with your team scale, project complexity, and delivery goals.
          </p>
        </div>

        {/* Engagement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {models.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <GlassCard className="h-full flex flex-col justify-between border-white/10 bg-slate-900/80 hover:border-blue-500/30">
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20">
                        <Icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-blue-300 border border-blue-500/30 bg-blue-500/10 px-3 py-1 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                      {item.subtitle}
                    </p>

                    <div className="space-y-3 mb-8">
                      {item.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2.5 text-xs text-slate-300">
                          <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-blue-300 stroke-[3]" />
                          </div>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={onOpenAuditModal}
                    className="w-full py-3.5 px-4 rounded-xl font-semibold text-xs uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                  >
                    Select Model &amp; Request Scope
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngagementModels;
