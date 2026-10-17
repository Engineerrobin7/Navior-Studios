"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/layout/Hero";
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

      {/* Hero Section with Quick Scoping Tool */}
      <Hero onOpenAuditModal={handleOpenAuditModal} />

      {/* Client Case Studies Showcase */}
      <CaseStudies onOpenAuditModal={handleOpenAuditModal} />

      {/* Full-Spectrum IT Services Matrix */}
      <Services onOpenAuditModal={handleOpenAuditModal} />

      {/* Interactive 4-Step Tech Stack Configurator Funnel */}
      <TechConfigurator onOpenAuditModal={handleOpenAuditModal} />

      {/* Architectural Benchmarks Comparison Table */}
      <ComparisonTable />

      {/* Enterprise Tech Stack Grid */}
      <TechStack />

      {/* Flexible Engagement Models */}
      <EngagementModels onOpenAuditModal={handleOpenAuditModal} />

      {/* 4-Step Engineering Delivery Pipeline */}
      <AuditProcess onOpenAuditModal={handleOpenAuditModal} />

      {/* Consultation & Discovery Lead Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={handleCloseAuditModal}
      />

      {/* Agency Footer */}
      <Footer onOpenAuditModal={handleOpenAuditModal} />
    </main>
  );
}
