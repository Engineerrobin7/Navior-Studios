"use client";

import React from "react";
import { Mail, MapPin, ArrowUpRight, ShieldCheck, Award, FileText } from "lucide-react";
import Logo from "@/components/ui/Logo";

interface FooterProps {
  onOpenAuditModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuditModal }) => {
  return (
    <footer className="border-t border-white/10 bg-[#090d16] relative overflow-hidden pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info & Global Footprint */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-block focus:outline-none">
              <Logo size={36} />
            </a>

            <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
              Navior Studios is a global enterprise IT solution agency engineering custom software, iOS/Android mobile platforms, multi-cloud architectures, and production AI integrations.
            </p>

            {/* Certifications & Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-mono text-slate-300">
              <span className="px-2.5 py-1 rounded border border-blue-500/30 bg-blue-500/10 text-blue-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                ISO 27001
              </span>
              <span className="px-2.5 py-1 rounded border border-blue-500/30 bg-blue-500/10 text-blue-300 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-emerald-400" />
                SOC 2 Type II
              </span>
              <span className="px-2.5 py-1 rounded border border-blue-500/30 bg-blue-500/10 text-blue-300">
                HIPAA &amp; PCI-DSS
              </span>
            </div>

            {/* Regional Hubs */}
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span className="font-medium text-slate-200">Global Hubs:</span>
              <span className="text-blue-300 font-mono tracking-wide">
                New York | London | Chandigarh
              </span>
            </div>
          </div>

          {/* Quick Enterprise Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Enterprise Solutions
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#solutions" className="hover:text-blue-400 transition-colors">
                  Banking &amp; FinTech Solutions
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-blue-400 transition-colors">
                  Healthcare &amp; EHR Platforms
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Cross-Platform Mobile Apps
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Cloud Infrastructure &amp; AI
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAuditModal}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors inline-flex items-center gap-1 pt-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Submit Enterprise RFP</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Inquiries */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Global Procurement &amp; Inquiries
            </h4>
            <p className="text-xs text-slate-300">
              Need a formal RFP proposal, cloud architecture audit, or dedicated engineering squad? Connect directly with our enterprise architects.
            </p>
            <a
              href="mailto:contact@naviorstudios.store"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-blue-500/40 text-sm font-mono text-blue-300 transition-all group"
            >
              <Mail className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span>contact@naviorstudios.store</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Navior Studios (naviorstudios.store). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Enterprise SLA &amp; 99.999% Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
