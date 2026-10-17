"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowLeft,
  LifeBuoy,
  FileText,
  Activity,
  Layers,
  Lock,
  Zap,
  Sparkles,
  ChevronRight
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import GlassCard from "@/components/ui/GlassCard";

interface Project {
  id: string;
  title: string;
  service: string;
  status: "IN_PROGRESS" | "TESTING" | "COMPLETED";
  progress: number;
  sprint: string;
  repo: string;
}

const mockProjects: Project[] = [
  {
    id: "PRJ-9012",
    title: "OmniPay Mobile Banking iOS & Android App",
    service: "Mobile App Development",
    status: "IN_PROGRESS",
    progress: 78,
    sprint: "Sprint 4 / 6: Biometric Security & Stripe Bridge",
    repo: "https://github.com/navior-studios/omnipay-mobile",
  },
  {
    id: "PRJ-8841",
    title: "MedPulse Multi-Tenant Healthcare SaaS Engine",
    service: "Cloud SaaS Platform",
    status: "TESTING",
    progress: 92,
    sprint: "Sprint 8 / 8: HIPAA Audit & Load Hardening",
    repo: "https://github.com/navior-studios/medpulse-saas",
  },
];

const mockInvoices = [
  { id: "INV-2026-001", description: "Sprint 1–3 Milestone Delivery", amount: "$18,500", status: "PAID", date: "Oct 01, 2026" },
  { id: "INV-2026-002", description: "Sprint 4–6 Milestone Delivery", amount: "$18,500", status: "PENDING", date: "Nov 15, 2026" },
];

export default function ClientPortalPage() {
  const [activeTab, setActiveTab] = useState<"projects" | "invoices" | "tickets">("projects");

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f8fafc] font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Top Portal Header */}
      <header className="border-b border-white/10 bg-[#090d16]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="p-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Agency Site</span>
            </a>
            <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />
            <Logo size={28} showText={true} />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 text-blue-300">
              Client Portal Sandbox
            </span>
            <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-400/40 flex items-center justify-center font-bold text-xs text-blue-300">
              NS
            </div>
          </div>
        </div>
      </header>

      {/* Main Portal Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Banner */}
        <div className="mb-8 p-6 sm:p-8 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-slate-900/80 to-blue-950/40 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  Live Operations Gateway
                </span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Welcome to Navior Studios Operations Hub
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Real-time milestone tracking, code repository links, and active sprint metrics for your account.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-xs text-slate-400">Account Access Tier:</div>
                <div className="text-xs font-mono font-bold text-blue-300">Enterprise Dedicated Squad</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "projects"
                ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                : "border border-white/10 bg-slate-900/50 text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Active Engineering Sprints ({mockProjects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("invoices")}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "invoices"
                ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                : "border border-white/10 bg-slate-900/50 text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Milestone Invoices ({mockInvoices.length})</span>
          </button>
        </div>

        {/* TAB 1: ACTIVE PROJECTS */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockProjects.map((project) => (
              <GlassCard key={project.id} className="border-white/10 bg-slate-900/80">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-slate-400 border border-white/10 px-2.5 py-1 rounded-md bg-slate-950">
                    {project.id}
                  </span>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300">
                    {project.status.replace("_", " ")}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-blue-400 font-medium mb-4">
                  Service: {project.service}
                </p>

                {/* Active Sprint Notice */}
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 mb-6 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>{project.sprint}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400">Sprint Completion</span>
                    <span className="text-blue-300 font-bold">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <FolderGit2 className="w-4 h-4 text-blue-400" />
                    <span>GitHub Code Repository</span>
                  </a>

                  <span className="text-[11px] font-mono text-slate-500">
                    CI/CD Pipeline Active
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* TAB 2: INVOICES */}
        {activeTab === "invoices" && (
          <GlassCard className="p-0 border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-950/80 text-xs text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Invoice ID</th>
                    <th className="py-4 px-6">Milestone Scope</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Due Date</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-xs sm:text-sm">
                  {mockInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-white/[0.02]">
                      <td className="py-4 px-6 font-mono font-bold text-white">{inv.id}</td>
                      <td className="py-4 px-6 text-slate-300">{inv.description}</td>
                      <td className="py-4 px-6 font-mono font-bold text-blue-300">{inv.amount}</td>
                      <td className="py-4 px-6 text-slate-400">{inv.date}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                            inv.status === "PAID"
                              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                              : "border-amber-500/30 bg-amber-500/10 text-amber-300"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}
      </main>
    </div>
  );
}
