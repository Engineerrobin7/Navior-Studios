"use client";

import React from "react";
import { Mail, MapPin, ArrowUpRight, Code2 } from "lucide-react";
import Logo from "@/components/ui/Logo";

interface FooterProps {
  onOpenAuditModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuditModal }) => {
  return (
    <footer className="border-t border-white/10 bg-[#090d16] relative overflow-hidden pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Logo & Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#" className="inline-block focus:outline-none">
              <Logo size={36} />
            </a>

            <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
              Navior Studios is a full-service technology agency engineering custom software, native iOS/Android mobile apps, Next.js web applications, and multi-tenant cloud SaaS systems.
            </p>

            {/* Regional Hub Tags */}
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
              <span className="font-medium text-slate-200">Regional Technology Hubs:</span>
              <span className="text-blue-300 font-mono tracking-wide">
                Chandigarh | Mohali | Panchkula
              </span>
            </div>
          </div>

          {/* Quick IT Services */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Technology Solutions
            </h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Mobile App Development
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Full-Stack Next.js &amp; React
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Multi-Tenant SaaS Engineering
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">
                  Custom Enterprise Software
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenAuditModal}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors inline-flex items-center gap-1 pt-1"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Schedule Tech Discovery</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Direct Engineering Inquiries
            </h4>
            <p className="text-xs text-slate-300">
              Have a mobile app concept, custom SaaS platform, or enterprise software project? Connect directly with our lead architects.
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

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Navior Studios (naviorstudios.store). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">SLA &amp; Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
