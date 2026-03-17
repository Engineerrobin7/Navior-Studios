"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { auth, db } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  sendSignInLinkToEmail,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Chrome, ArrowRight, Link as LinkIcon, Sparkles, Phone, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordless, setIsPasswordless] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const router = useRouter();

  const setupRecaptcha = () => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response: any) => {
          console.log("reCAPTCHA solved");
        }
      });
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isPasswordless) {
        const actionCodeSettings = {
          url: `${window.location.origin}/auth/finish-signup`,
          handleCodeInApp: true,
        };
        await sendSignInLinkToEmail(auth, email, actionCodeSettings);
        window.localStorage.setItem('emailForSignIn', email);
        setEmailSent(true);
      } else if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      const formatPh = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      const confirmation = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
    } catch (error: any) {
      console.error(error);
      alert(error.message);
      if ((window as any).recaptchaVerifier) {
        (window as any).recaptchaVerifier.clear();
        (window as any).recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      router.push("/");
    } catch (error: any) {
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-32 px-6">
        <div className="w-full max-w-md space-y-12">
          <header className="text-center space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">
                Member Portal
            </span>
            <h1 className="text-6xl font-bold tracking-tighter">
                {emailSent ? "Check Email." : otpSent ? "Verify OTP." : isLogin ? "Sign In." : "Join Us."}
            </h1>
          </header>

          <AnimatePresence mode="wait">
            {emailSent ? (
              <motion.div
                key="email-sent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-8 py-12 glass rounded-3xl border border-white/10"
              >
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5">
                  <Mail size={32} className="text-white/40" />
                </div>
                <div className="space-y-4">
                  <p className="text-xl font-bold tracking-tight uppercase">Magic Link Sent</p>
                  <p className="text-sm text-white/40 max-w-[280px] mx-auto leading-relaxed">
                    We&apos;ve sent a secure sign-in link to <span className="text-white">{email}</span>. 
                    Click the link to enter the lab.
                  </p>
                </div>
                <button 
                  onClick={() => setEmailSent(false)}
                  className="text-xs uppercase tracking-widest font-black text-white/20 hover:text-white transition-colors"
                >
                  Didn&apos;t get it? Try again
                </button>
              </motion.div>
            ) : otpSent ? (
              <motion.div
                key="otp-sent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/5">
                    <ShieldCheck size={32} className="text-white/40" />
                  </div>
                  <p className="text-sm text-white/40 max-w-[280px] mx-auto leading-relaxed">
                    Enter the 6-digit code sent to <span className="text-white">{phoneNumber}</span>
                  </p>
                </div>

                <form onSubmit={handleOTPVerify} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-white/30 text-center block">Verification Code</label>
                    <input
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-5 text-center text-3xl font-black tracking-[0.5em] focus:outline-none focus:border-white/30 transition-all placeholder:text-white/5"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl flex items-center justify-center space-x-3 hover:bg-white/90 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Verify & Enter</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-[10px] uppercase tracking-widest font-black text-white/20 hover:text-white transition-colors"
                  >
                    Change Phone Number
                  </button>
                </form>
              </motion.div>
            ) : (
              <div className="space-y-10">
                {/* Auth Method Switcher */}
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => { setAuthMethod("email"); setIsPasswordless(false); }}
                    className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      authMethod === "email" ? "bg-white text-black shadow-xl" : "text-white/40 hover:text-white"
                    }`}
                  >
                    Email
                  </button>
                  <button
                    onClick={() => setAuthMethod("phone")}
                    className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      authMethod === "phone" ? "bg-white text-black shadow-xl" : "text-white/40 hover:text-white"
                    }`}
                  >
                    Phone
                  </button>
                </div>

                {authMethod === "email" ? (
                  <form onSubmit={handleEmailAuth} className="space-y-6">
                    <AnimatePresence mode="wait">
                      {!isLogin && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-2"
                        >
                          <label className="text-[10px] uppercase tracking-widest font-black text-white/30">Full Name</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} strokeWidth={1.5} />
                            <input
                              type="text"
                              placeholder="Navior Member"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-white/30">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} strokeWidth={1.5} />
                        <input
                          type="email"
                          placeholder="name@navior.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                        />
                      </div>
                    </div>

                    {!isPasswordless && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-2"
                      >
                        <label className="text-[10px] uppercase tracking-widest font-black text-white/30">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} strokeWidth={1.5} />
                          <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={!isPasswordless}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                          />
                        </div>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl flex items-center justify-center space-x-3 hover:bg-white/90 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>{isPasswordless ? "Send Magic Link" : isLogin ? "Enter Lab" : "Register"}</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => setIsPasswordless(!isPasswordless)}
                        className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-black text-white/30 hover:text-white transition-colors"
                      >
                        <Sparkles size={12} className={isPasswordless ? "text-white" : ""} />
                        <span>{isPasswordless ? "Use Password Instead" : "Sign In with Magic Link"}</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handlePhoneAuth} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-black text-white/30">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} strokeWidth={1.5} />
                        <input
                          type="tel"
                          placeholder="+91 00000 00000"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl flex items-center justify-center space-x-3 hover:bg-white/90 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Send OTP Code</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                    <div id="recaptcha-container" className="hidden"></div>
                  </form>
                )}
              </div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20">OR</span>
                <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-1 gap-4">
                <button
                    onClick={handleGoogleSignIn}
                    className="w-full py-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center space-x-3 hover:bg-white/10 transition-all"
                >
                    <Chrome size={18} strokeWidth={1.5} />
                    <span className="text-xs font-bold uppercase tracking-widest">Sign in with Google</span>
                </button>
            </div>
          </div>

          <footer className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs uppercase tracking-widest font-bold text-white/30 hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Join Now" : "Already a member? Sign In"}
            </button>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default AuthPage;
