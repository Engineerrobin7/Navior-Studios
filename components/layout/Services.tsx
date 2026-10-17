"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Globe,
  Layers,
  Cpu,
  Zap,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

interface ServicesProps {
  onOpenAuditModal: () => void;
}

const servicesData = [
  {
    icon: Smartphone,
    title: "Mobile App Development (iOS & Android)",
    description:
      "Cross-platform and native mobile application engineering using React Native & Flutter. Built for silky smooth 60fps animations, offline sync, biometric security, and push notifications.",
    features: ["iOS App Store & Android Play Store", "React Native & Native Swift/Kotlin", "Sub-100ms UI Micro-interactions"],
    badge: "Mobile Apps",
  },
  {
    icon: Globe,
    title: "Full-Stack Web Development",
    description:
      "Ultra-fast, high-converting Next.js 14 and React platforms. Modernizing slow legacy sites into serverless edge architectures with instant page loads.",
    features: ["Next.js App Router & Server Actions", "Headless CMS & Commerce Integration", "Edge Network CDN Caching"],
    badge: "Web Platforms",
  },
  {
    icon: Layers,
    title: "SaaS Platform Engineering",
    description:
      "End-to-end multi-tenant SaaS application development. Robust multi-region PostgreSQL databases, Stripe billing, role-based auth, and automated client onboarding.",
    features: ["Multi-Tenant Architecture", "Subscription Billing & Usage Metrics", "Automated DevOps Pipelines"],
    badge: "SaaS Systems",
  },
  {
    icon: Cpu,
    title: "Custom Software & Enterprise IT",
    description:
      "Bespoke enterprise software tailored to your proprietary business workflows. High-throughput REST & GraphQL APIs, microservices, and CRM/ERP integrations.",
    features: ["Tailored Business Automations", "Microservices & Distributed Systems", "Bank-Grade Encryption & Security"],
    badge: "Custom Software",
  },
  {
    icon: Zap,
    title: "Speed Optimization & Modernization",
    description:
      "Refactoring slow WordPress, Magento, or PHP legacy frontends into ultra-fast React engines. Direct optimization for LCP < 800ms and zero layout shifts.",
    features: ["Core Web Vitals 98+ PageSpeed", "Zero Cumulative Layout Shift (CLS)", "Code Bundle Refactoring"],
    badge: "Speed Engine",
  },
  {
    icon: Sparkles,
    title: "Quiet Luxury UI/UX & Product Design",
    description:
      "Clean, modern, dark-mode design systems tailored for high-growth brands. Accessible high-contrast typography, interactive prototypes, and Framer Motion visual polish.",
    features: ["Quiet Luxury Design Tokens", "Interactive Figma Prototypes", "A11y High Contrast Hierarchy"],
    badge: "Design System",
  },
];

export const Services: React.FC<ServicesProps> = ({ onOpenAuditModal }) => {
  return (
    <section id="services" className="py-24 relative overflow-hidden bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
            Full-Spectrum IT Solutions
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Software, Apps &amp; Platforms Built for Enterprise Scale
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            We deliver complete custom engineering across mobile, web, SaaS, and cloud infrastructure—no bloated templates, just clean code.
          </p>
        </div>

        {/* 6 Core IT Offerings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <GlassCard className="h-full flex flex-col justify-between group">
                  <div>
                    {/* Top Row */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/40 transition-colors">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 border border-white/10 px-3 py-1 rounded-full">
                        {service.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-2 mb-8">
                      {service.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2 text-xs text-zinc-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action link */}
                  <button
                    onClick={onOpenAuditModal}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors pt-4 border-t border-white/10"
                  >
                    <span>Request Technical Blueprint</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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

export default Services;
