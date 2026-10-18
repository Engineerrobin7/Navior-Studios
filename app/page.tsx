"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
import GlobalPresence from "@/components/layout/GlobalPresence";
import IndustryVerticals from "@/components/layout/IndustryVerticals";
import CaseStudies from "@/components/layout/CaseStudies";
import Services from "@/components/layout/Services";
import TechConfigurator from "@/components/layout/TechConfigurator";
import ComparisonTable from "@/components/layout/ComparisonTable";
import TechStack from "@/components/layout/TechStack";
import EngagementModels from "@/components/layout/EngagementModels";
import AuditProcess from "@/components/layout/AuditProcess";
import AuditModal from "@/components/layout/AuditModal";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const handleOpenAuditModal = () => setIsAuditModalOpen(true);
  const handleCloseAuditModal = () => setIsAuditModalOpen(false);

  return (
    <main className="min-h-screen bg-[#090d16] text-[#f8fafc] relative overflow-x-hidden selection:bg-blue-500/30 selection:text-blue-200">
      {/* Sticky Top Navbar */}
      <Navbar onOpenAuditModal={handleOpenAuditModal} />

      {/* Hero Core Section with Scope & RFP Matrix */}
      <Hero onOpenAuditModal={handleOpenAuditModal} />

      {/* Global Delivery Model & 24/7 NOC Centers */}
      <GlobalPresence />

      {/* Industry Vertical Solutions (FinTech, Healthcare, Logistics, Retail, SaaS) */}
      <IndustryVerticals onOpenAuditModal={handleOpenAuditModal} />

      {/* Verified Client Case Studies Showcase */}
      <CaseStudies onOpenAuditModal={handleOpenAuditModal} />

      {/* Full-Spectrum IT Engineering Services */}
      <Services onOpenAuditModal={handleOpenAuditModal} />

      {/* Interactive 4-Step Tech Stack Configurator Funnel & PDF Spec */}
      <TechConfigurator onOpenAuditModal={handleOpenAuditModal} />

      {/* Architectural Benchmarks Comparison Table */}
      <ComparisonTable />

      {/* Enterprise Tech Stack Grid */}
      <TechStack />

      {/* Flexible Engagement Models (Dedicated Squads, Turnkey Scope, Advisory) */}
      <EngagementModels onOpenAuditModal={handleOpenAuditModal} />

      {/* 4-Step Engineering Delivery Pipeline */}
      <AuditProcess onOpenAuditModal={handleOpenAuditModal} />

      {/* RFP Proposal Submission Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAuditModal}
      />

      {/* Corporate Footer */}
      <Footer onOpenAuditModal={handleOpenAuditModal} />
    </main>
  );
}
