"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useCartStore } from "@/store/useCartStore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import axios from "axios";
import { CreditCard, Truck, ShieldCheck, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CheckoutPage = () => {
  const { cart, getTotal, clearCart } = useCartStore();
  const { user, userData } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [paymentStep, setPaymentStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  const [shippingData, setShippingData] = useState({
    name: userData?.displayName || "",
    email: user?.email || "",
    phone: userData?.phone || "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  useEffect(() => {
    if (cart.length === 0 && paymentStep !== 3) {
      router.push("/collection");
    }
  }, [cart, router, paymentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    try {
      // 1. Create order on server
      const { data: orderData } = await axios.post("/api/razorpay", {
        amount: getTotal(),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      });

      // 2. Pre-create order in Firestore with "pending" status
      const { db } = await import("@/lib/firebase");
      const { collection, addDoc } = await import("firebase/firestore");
      
      await addDoc(collection(db, "orders"), {
        userId: user?.uid || "guest",
        items: cart,
        total: getTotal(),
        shippingData,
        paymentStatus: "pending",
        razorpayOrderId: orderData.id,
        createdAt: new Date().toISOString(),
      });

      // 3. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "NAVIOR STUDIOS",
        description: "Premium Gear Checkout",
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            // 3. Verify payment signature on the server
            const verifyRes = await axios.post("/api/razorpay/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.data.message === "Payment verified successfully") {
              clearCart();
              setPaymentStep(3);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("An error occurred during verification.");
          }
        },
        prefill: {
          name: shippingData.name,
          email: shippingData.email,
          contact: shippingData.phone,
        },
        theme: {
          color: "#000000",
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Checkout Steps */}
          <div className="space-y-12">
            <header className="space-y-4">
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">
                  Secure Checkout
              </span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
                  Checkout.
              </h1>
            </header>

            <AnimatePresence mode="wait">
              {paymentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold">1</div>
                    <h2 className="text-2xl font-bold tracking-tight">Shipping Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Full Name</label>
                      <input
                        name="name"
                        value={shippingData.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Phone Number</label>
                      <input
                        name="phone"
                        value={shippingData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Address</label>
                      <input
                        name="address"
                        value={shippingData.address}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">City</label>
                      <input
                        name="city"
                        value={shippingData.city}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">ZIP Code</label>
                      <input
                        name="zip"
                        value={shippingData.zip}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-white/20"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setPaymentStep(2)}
                    className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl flex items-center justify-center space-x-3 hover:bg-white/90 transition-all"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}

              {paymentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-4 mb-8">
                    <button 
                      onClick={() => setPaymentStep(1)}
                      className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center font-bold"
                    >1</button>
                    <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold">2</div>
                    <h2 className="text-2xl font-bold tracking-tight">Payment Method</h2>
                  </div>

                  <div className="glass p-8 rounded-2xl border border-white/10 space-y-6">
                    <div className="flex items-center space-x-4">
                        <div className="p-3 bg-white/10 rounded-lg">
                            <CreditCard size={24} />
                        </div>
                        <div>
                            <p className="font-bold">Razorpay Secure Payment</p>
                            <p className="text-xs text-white/40">UPI, Cards, Netbanking, Wallets</p>
                        </div>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed">
                        After clicking “Pay Now”, you will be redirected to Razorpay to complete your purchase securely.
                    </p>
                  </div>

                  <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl flex items-center justify-center space-x-3 hover:bg-white/90 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>Pay Now</span>
                            <ArrowRight size={16} />
                        </>
                    )}
                  </button>
                </motion.div>
              )}

              {paymentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 space-y-8"
                >
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck size={48} className="text-white" />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-5xl font-bold tracking-tighter">Order Placed.</h2>
                    <p className="text-white/40 uppercase tracking-widest text-sm max-w-sm mx-auto">
                      Thank you for your purchase. We've sent a confirmation to {shippingData.email}.
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/collection")}
                    className="px-12 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-xl hover:bg-white/90 transition-all"
                  >
                    Back to Collection
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          {paymentStep !== 3 && (
            <div className="lg:sticky lg:top-32 h-fit space-y-8">
                <div className="glass p-8 rounded-3xl border border-white/10 space-y-8">
                    <h3 className="text-xl font-bold tracking-tight">Order Summary</h3>
                    
                    <div className="space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex justify-between">
                                <div className="flex space-x-4">
                                    <div className="w-16 h-16 bg-white/5 rounded-xl border border-white/5 overflow-hidden shrink-0 flex items-center justify-center text-[8px] font-bold text-white/20">
                                        {item.name.substring(0, 2)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm uppercase tracking-tight">{item.name}</p>
                                        <p className="text-xs text-white/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-white/10 space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-white/40 uppercase tracking-widest font-black">Subtotal</span>
                            <span className="font-bold">₹{getTotal().toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-white/40 uppercase tracking-widest font-black">Shipping</span>
                            <span className="text-white font-black uppercase tracking-widest">Calculated later</span>
                        </div>
                        <div className="flex justify-between items-end pt-4">
                            <span className="text-xl font-black tracking-tight uppercase">Total</span>
                            <span className="text-5xl font-black tracking-tighter">₹{getTotal().toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4 text-white/20 uppercase tracking-[0.2em] text-[10px] font-bold justify-center">
                    <div className="flex items-center space-x-2">
                        <ShieldCheck size={14} />
                        <span>Secure Checkout</span>
                    </div>
                    <div className="w-1 h-1 bg-white/10 rounded-full" />
                    <div className="flex items-center space-x-2">
                        <Truck size={14} />
                        <span>Global Shipping</span>
                    </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
