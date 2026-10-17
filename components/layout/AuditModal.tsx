"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Zap,
  Globe,
  Sliders,
  User,
  Mail,
  Phone,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Code2,
} from "lucide-react";
import { submitAuditLead } from "@/app/actions/leadActions";
import {
  SERVICE_OPTIONS,
  ServiceType,
  step1Schema,
  step2Schema,
} from "@/lib/validations/lead";

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2>(1);

  // Form State
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [bottleneck, setBottleneck] = useState<ServiceType>("Custom Software Development");
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Validation & Submission States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const validation = step1Schema.safeParse({ websiteUrl, bottleneck });
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const validation = step2Schema.safeParse({ clientName, email, phone });
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitAuditLead({
        websiteUrl,
        bottleneck,
        clientName,
        email,
        phone,
      });

      if (res.success) {
        setIsSuccess(true);
      } else {
        setServerError(res.message);
        if (res.errors) {
          const formatted: Record<string, string> = {};
          Object.entries(res.errors).forEach(([k, v]) => {
            if (v && v.length > 0) formatted[k] = v[0];
          });
          setErrors(formatted);
        }
      }
    } catch (err) {
      console.error(err);
      setServerError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setWebsiteUrl("");
    setBottleneck("Custom Software Development");
    setClientName("");
    setEmail("");
    setPhone("");
    setErrors({});
    setIsSubmitting(false);
    setIsSuccess(false);
    setServerError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetForm}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-xl rounded-2xl border border-white/15 bg-[#121212] p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
        >
          {/* Subtle Glow Header Line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Close Button */}
          <button
            onClick={resetForm}
            className="absolute top-5 right-5 p-2 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <>
              {/* Modal Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                    <Code2 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Get Free IT &amp; Tech Consultation
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Select your IT scope to receive a tailored architecture blueprint &amp; delivery timeline within 24 hours.
                </p>
              </div>

              {/* Step Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-2">
                  <span className={step === 1 ? "text-cyan-400" : "text-zinc-500"}>
                    Step 1: Project Scope
                  </span>
                  <span className={step === 2 ? "text-cyan-400" : "text-zinc-500"}>
                    Step 2: Contact Info
                  </span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"
                    initial={{ width: "50%" }}
                    animate={{ width: step === 1 ? "50%" : "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Server Error Alert */}
              {serverError && (
                <div className="mb-6 p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* STEP 1 FORM */}
              {step === 1 && (
                <form onSubmit={handleNextStep} className="space-y-6">
                  {/* Website / App URL Input */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Current Website or Reference URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Globe className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="https://yourbrand.com"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${
                          errors.websiteUrl ? "border-red-500" : "border-white/10"
                        } rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors`}
                      />
                    </div>
                    {errors.websiteUrl && (
                      <p className="mt-1 text-xs text-red-400">{errors.websiteUrl}</p>
                    )}
                  </div>

                  {/* Primary Service Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Primary Service Needed
                    </label>
                    <div className="grid grid-cols-1 gap-2.5">
                      {SERVICE_OPTIONS.map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setBottleneck(opt)}
                          className={`flex items-center justify-between p-3.5 rounded-xl border text-sm text-left transition-all ${
                            bottleneck === opt
                              ? "border-cyan-400 bg-cyan-500/10 text-white font-semibold"
                              : "border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/20"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Sliders className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                            <span>{opt}</span>
                          </div>
                          {bottleneck === opt && (
                            <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                    {errors.bottleneck && (
                      <p className="mt-1 text-xs text-red-400">{errors.bottleneck}</p>
                    )}
                  </div>

                  {/* Next Step Button */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-semibold text-sm text-black bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  >
                    Continue to Contact Info
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* STEP 2 FORM */}
              {step === 2 && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Client Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        placeholder="Alex Morgan"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${
                          errors.clientName ? "border-red-500" : "border-white/10"
                        } rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors`}
                      />
                    </div>
                    {errors.clientName && (
                      <p className="mt-1 text-xs text-red-400">{errors.clientName}</p>
                    )}
                  </div>

                  {/* Work Email Input */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Work Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        placeholder="alex@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 bg-zinc-900/90 border ${
                          errors.email ? "border-red-500" : "border-white/10"
                        } rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Phone Number <span className="text-zinc-500 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-zinc-900/90 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Buttons Action Group */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={isSubmitting}
                      className="px-4 py-3.5 rounded-xl border border-white/10 text-zinc-300 hover:text-white hover:bg-white/5 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm text-black bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-black" />
                          <span>Engaging Tech Team...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Tech Request</span>
                          <Zap className="w-4 h-4 fill-black" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            /* SUCCESS STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-5"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl font-bold text-white">
                  Consultation Request Received!
                </h3>
                <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-medium">{clientName}</span>.
                  Our senior architects at <span className="text-cyan-400 font-semibold">Navior Studios</span> have queued scope review for{" "}
                  <span className="text-cyan-300 font-mono text-xs">{bottleneck}</span>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-400 max-w-md mx-auto text-left space-y-1.5">
                <div className="text-zinc-200 font-semibold mb-1">What Happens Next:</div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Technical feasibility &amp; stack architecture mapping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Direct consultation blueprint dispatched to {email}</span>
                </div>
              </div>

              <button
                onClick={resetForm}
                className="mt-4 px-8 py-3 rounded-full font-semibold text-sm text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                Return to Navior Studios
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuditModal;
