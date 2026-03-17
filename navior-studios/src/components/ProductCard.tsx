"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useCartStore, Product } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCartStore();

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      y: -10,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-[#111111] rounded-[24px] border border-white/5 overflow-hidden transition-all duration-500 hover:border-white/20"
    >
      <Link href={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
                {product.images[0] ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                         <span className="text-white/5 font-black text-6xl tracking-tighter uppercase select-none">
                            {product.name.split(' ')[0]}
                        </span>
                    </div>
                )}
            </div>
        </div>
      </Link>

      <div className="p-6 space-y-4">
        <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-white/40">
                {product.category}
            </p>
            <h3 className="text-xl font-bold tracking-tight text-white leading-tight group-hover:text-white/80 transition-colors">
                {product.name}
            </h3>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-white/40 line-through">₹{(product.price * 1.2).toFixed(0)}</span>
            <span className="text-2xl font-black tracking-tighter text-white">₹{product.price.toLocaleString('en-IN')}</span>
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-white/90 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
