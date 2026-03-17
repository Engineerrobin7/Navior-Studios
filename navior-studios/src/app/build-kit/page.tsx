"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Product, useCartStore } from "@/store/useCartStore";
import { Smartphone, Laptop, Tablet, Plus, Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const devices = [
  { id: "iphone", name: "iPhone 16 Pro", icon: Smartphone },
  { id: "macbook", name: "MacBook Pro M3", icon: Laptop },
  { id: "ipad", name: "iPad Pro M4", icon: Tablet },
];

const BuildYourKit = () => {
  const [selectedDevice, setSelectedDevice] = useState(devices[0]);
  const [selectedAccessories, setSelectedAccessories] = useState<Product[]>([]);
  const { addToCart } = useCartStore();

  const accessories: Product[] = [
    {
      id: "case-1",
      name: "Titan Shield Case",
      price: 2499,
      images: [],
      category: "Cases",
      compatibility: ["iPhone 16 Pro"],
      description: "Ultra-premium titanium protection."
    },
    {
      id: "charger-1",
      name: "Lunar MagSafe Charger",
      price: 1899,
      images: [],
      category: "Power",
      compatibility: ["iPhone 16 Pro"],
      description: "Fast wireless charging."
    },
    {
      id: "lens-1",
      name: "Quantum Camera Lens",
      price: 999,
      images: [],
      category: "Accessories",
      compatibility: ["iPhone 16 Pro"],
      description: "Scratch-resistant sapphire glass."
    }
  ];

  const toggleAccessory = (accessory: Product) => {
    if (selectedAccessories.find((a) => a.id === accessory.id)) {
      setSelectedAccessories(selectedAccessories.filter((a) => a.id !== accessory.id));
    } else {
      setSelectedAccessories([...selectedAccessories, accessory]);
    }
  };

  const addAllToCart = () => {
    selectedAccessories.forEach((a) => addToCart(a));
    setSelectedAccessories([]);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6 max-w-6xl">
        <header className="mb-20 space-y-12">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">
                Customized Protection
            </span>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter">
                Build Kit.
            </h1>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Step 1: Select Device */}
            <div className="space-y-8">
                <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">1</div>
                    <h2 className="text-xl font-bold uppercase tracking-tight">Select Device</h2>
                </div>
                <div className="space-y-4">
                    {devices.map((device) => (
                        <button
                            key={device.id}
                            onClick={() => setSelectedDevice(device)}
                            className={`w-full p-6 rounded-2xl border transition-all flex items-center justify-between ${
                                selectedDevice.id === device.id
                                    ? "bg-white text-black border-white"
                                    : "bg-white/5 text-white border-white/10 hover:border-white/20"
                            }`}
                        >
                            <div className="flex items-center space-x-4">
                                <device.icon size={24} strokeWidth={1.5} />
                                <span className="font-bold text-sm uppercase tracking-widest">{device.name}</span>
                            </div>
                            {selectedDevice.id === device.id && <Check size={18} />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Step 2: Select Accessories */}
            <div className="lg:col-span-2 space-y-8">
                <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">2</div>
                    <h2 className="text-xl font-bold uppercase tracking-tight">Add Accessories</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {accessories.map((accessory) => {
                        const isSelected = selectedAccessories.find((a) => a.id === accessory.id);
                        return (
                            <button
                                key={accessory.id}
                                onClick={() => toggleAccessory(accessory)}
                                className={`p-8 rounded-3xl border transition-all text-left flex flex-col justify-between aspect-square ${
                                    isSelected
                                        ? "bg-white/10 border-white"
                                        : "bg-white/5 border-white/10 hover:border-white/20"
                                }`}
                            >
                                <div className="space-y-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? "bg-white text-black" : "bg-white/10"}`}>
                                        {isSelected ? <Check size={20} /> : <Plus size={20} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg tracking-tight uppercase">{accessory.name}</p>
                                        <p className="text-xs text-white/40 uppercase tracking-widest font-medium">{accessory.category}</p>
                                    </div>
                                </div>
                                <span className="text-2xl font-black tracking-tighter">${accessory.price}</span>
                            </button>
                        );
                    })}
                </div>

                {selectedAccessories.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass p-8 rounded-3xl border border-white/20 flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div className="space-y-2">
                            <p className="text-5xl font-black tracking-tighter">
                                ₹{selectedAccessories.reduce((total, a) => total + a.price, 0).toLocaleString('en-IN')}
                            </p>
                            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-black">
                                {selectedAccessories.length} Items Selected for {selectedDevice.name}
                            </p>
                        </div>
                        <button
                            onClick={addAllToCart}
                            className="w-full md:w-auto px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-full flex items-center justify-center space-x-3 hover:bg-white/90 transition-all shadow-2xl"
                        >
                            <span>Add Kit to Bag</span>
                            <ArrowRight size={14} />
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
      </div>
    </main>
  );
};

export default BuildYourKit;
