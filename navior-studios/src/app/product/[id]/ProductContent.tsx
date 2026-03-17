"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Product, useCartStore } from "@/store/useCartStore";
import { Shield, Zap, Package, ArrowLeft, Plus, Minus, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

interface ProductContentProps {
  initialProduct: Product;
}

const ProductContent: React.FC<ProductContentProps> = ({ initialProduct }) => {
  const router = useRouter();
  const [product] = useState<Product>(initialProduct);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCartStore();
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imageRef.current) {
        gsap.from(imageRef.current, {
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        });
    }
  }, [selectedImage]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection-white">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <button 
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-white/40 hover:text-white transition-colors mb-12 group"
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-black">Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-6">
            <div 
                ref={imageRef}
                className="aspect-square bg-[#111111] rounded-[40px] border border-white/5 overflow-hidden relative flex items-center justify-center group"
            >
                {product.images[selectedImage] ? (
                    <Image
                        src={product.images[selectedImage]}
                        alt={product.name}
                        fill
                        className="object-contain p-12 transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="text-white/5 font-black text-9xl tracking-tighter uppercase select-none">
                        {product.name.split(' ')[0]}
                    </div>
                )}
            </div>

            {product.images.length > 1 && (
                <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                    {product.images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedImage(i)}
                            className={`w-24 h-24 rounded-2xl border transition-all overflow-hidden shrink-0 flex items-center justify-center bg-[#111111] ${
                                selectedImage === i ? "border-white" : "border-white/5 hover:border-white/20"
                            }`}
                        >
                            <Image src={img} alt="" width={60} height={60} className="object-contain" />
                        </button>
                    ))}
                </div>
            )}
          </div>

          <div className="space-y-12">
            <header className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                    {product.category}
                </span>
                <button className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-white/40 hover:text-white">
                    <Share2 size={16} />
                </button>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
                {product.name.split(' ').map((word, i) => (
                    <React.Fragment key={i}>
                        {i === 1 ? <span className="text-white/20 italic block">{word}</span> : word + ' '}
                    </React.Fragment>
                ))}
              </h1>
              <div className="flex items-end space-x-4">
                <span className="text-5xl font-black tracking-tighter">₹{product.price.toLocaleString('en-IN')}</span>
                <span className="text-xl text-white/20 line-through mb-1">₹{(product.price * 1.3).toFixed(0)}</span>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-widest mb-2">Save 30%</span>
              </div>
            </header>

            <div className="space-y-8">
                <p className="text-lg text-white/60 leading-relaxed font-medium">
                    {product.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-[#111111] rounded-3xl border border-white/5 space-y-3">
                        <Shield size={24} className="text-white/40" />
                        <p className="text-[10px] uppercase tracking-widest font-black text-white/20">Durability</p>
                        <p className="text-sm font-bold">Titanium Alloy Grade 5</p>
                    </div>
                    <div className="p-6 bg-[#111111] rounded-3xl border border-white/5 space-y-3">
                        <Zap size={24} className="text-white/40" />
                        <p className="text-[10px] uppercase tracking-widest font-black text-white/20">Technology</p>
                        <p className="text-sm font-bold">MagSafe Optimized</p>
                    </div>
                </div>
            </div>

            <div className="space-y-8 pt-8 border-t border-white/5">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center space-x-6 bg-[#111111] border border-white/5 p-2 rounded-full w-full md:w-auto">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="text-lg font-black w-8 text-center">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-12 h-12 flex items-center justify-center hover:bg-white/5 rounded-full transition-colors"
                        >
                            <Plus size={16} />
                        </button>
                    </div>
                    <button 
                        onClick={handleAddToCart}
                        className="flex-1 w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.15)]"
                    >
                        Add to Bag
                    </button>
                </div>

                <div className="flex items-center space-x-6 justify-center md:justify-start">
                    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-black text-white/20">
                        <Package size={14} />
                        <span>Free Shipping in India</span>
                    </div>
                    <div className="w-1 h-1 bg-white/10 rounded-full" />
                    <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-black text-white/20">
                        <Shield size={14} />
                        <span>1 Year Warranty</span>
                    </div>
                </div>
            </div>
          </div>
        </div>

        <section className="mt-40 py-32 border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-12">
                    <h2 className="text-6xl font-black tracking-tighter uppercase leading-[0.85]">
                        Engineered for the <br />
                        <span className="text-white/10 italic">Unexpected.</span>
                    </h2>
                    <div className="space-y-8 text-white/40 text-lg leading-relaxed font-medium">
                        <p>
                            We didn&apos;t just design a case; we engineered a sanctuary for your gear. 
                            The {product.name} is the result of intensive material science research.
                        </p>
                        <p>
                            By combining high-performance materials with our proprietary 
                            polymer, we&apos;ve achieved a protection-to-weight ratio that defines 
                            the future of daily carry.
                        </p>
                    </div>
                </div>
                <div className="relative aspect-square bg-[#111111] rounded-[60px] overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-white/5 font-black text-[12rem] tracking-tighter uppercase select-none -rotate-12">
                            NAVIOR
                        </span>
                    </div>
                </div>
            </div>
        </section>
      </div>

      <footer className="py-20 border-t border-white/5 text-center text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">
        © 2026 Navior Studios. Engineered for the future.
      </footer>
    </main>
  );
};

export default ProductContent;
