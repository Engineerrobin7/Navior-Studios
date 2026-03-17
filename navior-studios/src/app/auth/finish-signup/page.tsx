"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck, Mail } from "lucide-react";

const FinishSignUp = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error" | "prompt">("loading");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const completeSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let emailForSignIn = window.localStorage.getItem("emailForSignIn");
        
        if (!emailForSignIn) {
          setStatus("prompt");
          return;
        }

        try {
          await signInWithEmailLink(auth, emailForSignIn, window.location.href);
          window.localStorage.removeItem("emailForSignIn");
          setStatus("success");
          setTimeout(() => router.push("/"), 2000);
        } catch (error) {
          console.error(error);
          setStatus("error");
        }
      }
    };

    completeSignIn();
  }, [router]);

  const handleManualEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await signInWithEmailLink(auth, email, window.location.href);
      window.localStorage.removeItem("emailForSignIn");
      setStatus("success");
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection-white flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          {status === "loading" && (
            <div className="space-y-6">
              <Loader2 className="w-12 h-12 animate-spin mx-auto text-white/20" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold uppercase tracking-tight">Verifying Link</h2>
                <p className="text-sm text-white/40 uppercase tracking-widest font-black">Decrypting your access...</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 text-emerald-400">
                <ShieldCheck size={40} />
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black uppercase tracking-tighter">Authenticated.</h2>
                <p className="text-sm text-white/40 uppercase tracking-widest font-black">Redirecting to home...</p>
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <div className="space-y-8">
              <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto border border-rose-500/20 text-rose-400">
                <ShieldCheck size={40} className="rotate-180" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold uppercase tracking-tight">Invalid Link</h2>
                <p className="text-sm text-white/40 leading-relaxed max-w-[280px] mx-auto">
                  The sign-in link is either expired or has already been used.
                </p>
                <button 
                  onClick={() => router.push("/auth")}
                  className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full"
                >
                  Return to Portal
                </button>
              </div>
            </div>
          )}

          {status === "prompt" && (
            <div className="space-y-8">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5">
                <Mail size={32} className="text-white/40" />
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold uppercase tracking-tight">Confirm Email</h2>
                  <p className="text-sm text-white/40 leading-relaxed">
                    Please provide your email address again to complete sign-in on this device.
                  </p>
                </div>
                <form onSubmit={handleManualEmailSubmit} className="space-y-4">
                  <input
                    type="email"
                    placeholder="name@navior.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-white/30 transition-all text-center"
                  />
                  <button
                    type="submit"
                    className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl"
                  >
                    Complete Sign In
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default FinishSignUp;
