"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useUIStore } from "@/store/useUIStore";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";

const Navbar = () => {
  const { cart } = useCartStore();
  const { user } = useAuth();
  const { isCartOpen, setCartOpen, isMobileMenuOpen, setMobileMenuOpen, setSearchOpen } = useUIStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass py-4 shadow-2xl" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center">
          <span className="bg-white text-black px-2 py-1 mr-2 rounded-sm">N</span>
          NAVIOR
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-12">
          {["Collection", "About", "Durability", "Build Kit"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="text-sm uppercase tracking-widest font-medium hover:text-white/60 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center space-x-2">
          <MagneticButton className="p-0">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-3 hover:bg-white/10 rounded-full transition-colors"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
          </MagneticButton>
          
          <MagneticButton className="p-0">
            <Link href={user ? "/profile" : "/auth"} className="p-3 hover:bg-white/10 rounded-full transition-colors block">
              <User size={20} strokeWidth={1.5} className={user ? "text-white" : "text-white/40"} />
            </Link>
          </MagneticButton>

          <MagneticButton className="p-0">
            <button
              onClick={() => setCartOpen(!isCartOpen)}
              className="p-3 hover:bg-white/10 rounded-full transition-colors relative"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItemCount > 0 && (
                <span className="absolute top-2 right-2 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </MagneticButton>
          
          <button
            className="md:hidden p-3 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center space-y-8"
          >
            <button
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} strokeWidth={1.5} />
            </button>
            {["Collection", "About", "Durability", "Build Kit"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-3xl font-bold tracking-tighter hover:text-white/60 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
