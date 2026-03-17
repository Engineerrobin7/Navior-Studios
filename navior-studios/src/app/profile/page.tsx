"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { User, Package, LogOut, ChevronRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { user, userData, signOut } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="pt-32 pb-20 container mx-auto px-6 max-w-5xl">
          <header className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">
                  Member Profile
              </span>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
                  Welcome, <br />
                  <span className="text-white/20 italic">{userData?.displayName || "Member"}</span>
              </h1>
            </div>
            <button
                onClick={() => signOut()}
                className="flex items-center space-x-3 px-8 py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest"
            >
                <LogOut size={16} />
                <span>Sign Out</span>
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* User Info Sidebar */}
            <div className="space-y-8">
                <div className="glass p-8 rounded-3xl border border-white/10 space-y-8">
                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-3xl font-black border border-white/5 shadow-2xl">
                        {userData?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Email Address</p>
                            <p className="text-sm font-medium">{user?.email}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] uppercase tracking-widest font-bold text-white/30">Member Since</p>
                            <p className="text-sm font-medium">
                                {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : "March 2026"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders Section */}
            <div className="lg:col-span-2 space-y-12">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Package size={24} className="text-white/40" />
                        <h2 className="text-2xl font-bold tracking-tight uppercase">Order History</h2>
                    </div>
                    <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40">
                        {orders.length} Orders
                    </span>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : orders.length > 0 ? (
                    <div className="space-y-4">
                        {orders.map((order, index) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
                            >
                                <div className="flex items-center space-x-6">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                                        <ShoppingBag size={20} className="text-white/20" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-1">
                                            Order #{order.id.slice(-6).toUpperCase()}
                                        </p>
                                        <p className="font-bold tracking-tight">
                                            {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'} • ${order.total.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                    <div className="text-right hidden md:block">
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-white/20 mb-1">Status</p>
                                        <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                                            {order.paymentStatus}
                                        </p>
                                    </div>
                                    <ChevronRight size={20} className="text-white/10 group-hover:text-white transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center space-y-6 glass rounded-3xl border border-white/5">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                            <ShoppingBag size={24} className="text-white/20" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-xl font-bold tracking-tight">No orders yet.</p>
                            <p className="text-xs text-white/40 uppercase tracking-widest font-bold">
                                Your gear collection will appear here.
                            </p>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>

        <footer className="py-20 border-t border-white/5 text-center text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">
            © 2026 Navior Studios. Engineered for the future.
        </footer>
      </main>
    </ProtectedRoute>
  );
};

export default ProfilePage;
