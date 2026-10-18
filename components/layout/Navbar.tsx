"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, FileText, Lock, Activity, ShieldCheck } from "lucide-react";
import Logo from "@/components/ui/Logo";

interface NavbarProps {
  onOpenAuditModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuditModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Industries", href: "#solutions" },
    { name: "Services", href: "#services" },
    { name: "Case Studies", href: "#case-studies" },
    { name: "Global Network", href: "#global-presence" },
    { name: "Tech Stack", href: "#tech-stack" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#070a12]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Operational Status Tag */}
          <div className="flex items-center gap-4">
            <a href="#" className="focus:outline-none">
              <Logo size={36} />
            </a>

            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NODES OPERATIONAL &bull; 99.999% SLA</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/portal"
              className="text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Client Portal</span>
            </a>
          </nav>

          {/* High-Contrast Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenAuditModal}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] border border-blue-400/40 glow-border"
            >
              <span className="relative z-10 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Submit Enterprise RFP
                <ArrowRight className="w-4 h-4" />
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#070a12]/95 backdrop-blur-xl border-b border-white/10 px-4 pt-4 pb-6 mt-3"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-300 hover:text-blue-400 transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-blue-400 hover:text-blue-300 transition-colors py-2 border-b border-white/5 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Client Operations Hub</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuditModal();
                }}
                className="mt-2 w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                Submit Enterprise RFP
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
