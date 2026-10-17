"use client";

import React from "react";
import { motion } from "framer-motion";
import { Smartphone, Database, Cloud, Code2, Lock, Cpu } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

const stackCategories = [
  {
    icon: Smartphone,
    category: "Mobile & Frontend",
    techs: ["React Native", "Swift (iOS)", "Kotlin (Android)", "Next.js 14", "React 18", "Tailwind CSS"],
  },
  {
    icon: Code2,
    category: "Backend & Microservices",
    techs: ["Node.js", "TypeScript", "Python / FastAPI", "GraphQL APIs", "REST Microservices", "Go"],
  },
  {
    icon: Database,
    category: "Databases & Storage",
    techs: ["PostgreSQL", "Prisma ORM", "Redis Cache", "MongoDB", "Amazon S3", "Pinecone Vector DB"],
  },
  {
    icon: Cloud,
    category: "Cloud & DevOps",
    techs: ["Amazon Web Services (AWS)", "Docker", "Kubernetes", "Vercel Edge", "GitHub Actions CI/CD", "Terraform"],
  },
  {
    icon: Lock,
    category: "Security & Auth",
    techs: ["OAuth 2.0 / OIDC", "Biometric Authentication", "AES-256 Encryption", "SOC2 Compliance", "SSL / TLS"],
  },
  {
    icon: Cpu,
    title: "AI & Data Engineering",
    techs: ["OpenAI API", "Vector Embeddings", "LangChain", "PyTorch", "Data Pipelines"],
  },
];

export const TechStack: React.FC = () => {
  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase">
            Modern Engineering Stack
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Battle-Tested Technologies &amp; Cloud Infrastructure
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            We write clean, typed, maintainable code using industry-standard enterprise frameworks.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stackCategories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.category || item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <GlassCard className="h-full p-6 border-white/10 bg-slate-900/60 hover:border-blue-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/20">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="font-display text-base font-bold text-white">
                      {item.category || item.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {item.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-950/80 border border-white/10 text-slate-300 hover:text-white hover:border-blue-400/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
