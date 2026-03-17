"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/store/useCartStore";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const CollectionPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Cases", "Accessories", "Audio", "Power"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("price", "desc"));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback with some dummy data if Firebase is not setup yet
        const dummyProducts: Product[] = [
          {
            id: "1",
            name: "Titan Shield Pro",
            price: 2499,
            images: [],
            category: "Cases",
            compatibility: ["iPhone 16 Pro"],
            description: "Ultra-premium titanium protection."
          },
          {
            id: "2",
            name: "Lunar MagSafe Charger",
            price: 1899,
            images: [],
            category: "Power",
            compatibility: ["Universal"],
            description: "Fast wireless charging with lunar aesthetics."
          },
          {
            id: "3",
            name: "Obsidian Audio Buds",
            price: 6999,
            images: [],
            category: "Audio",
            compatibility: ["Universal"],
            description: "Pure sound, deep obsidian design."
          },
          {
              id: "4",
              name: "Quantum Glass Screen",
              price: 999,
              images: [],
              category: "Accessories",
              compatibility: ["iPhone 16 Pro"],
              description: "Indestructible screen protection."
          }
        ];
        setProducts(dummyProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-6">
        <header className="mb-20 space-y-12">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-white/30">
                Explore the range
            </span>
            <h1 className="text-7xl md:text-9xl font-bold tracking-tighter">
                Collection.
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Search Bar */}
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={20} strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search gear..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-sm font-medium focus:outline-none focus:border-white/20 transition-all placeholder:text-white/20"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl mr-2">
                    <SlidersHorizontal size={18} className="text-white/40" />
                </div>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                            activeCategory === cat
                                ? "bg-white text-black border-white"
                                : "bg-transparent text-white/40 border-white/10 hover:border-white/20"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
          </div>
        </header>

        {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-4/5 bg-white/5 rounded-3xl animate-pulse" />
                ))}
            </div>
        ) : (
            <>
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-40 text-center space-y-6">
                        <div className="text-6xl font-black text-white/5">NO MATCHES</div>
                        <p className="text-white/40 uppercase tracking-widest text-sm">
                            Try adjusting your filters or search query.
                        </p>
                    </div>
                )}
            </>
        )}
      </div>

      <footer className="py-20 border-t border-white/5 text-center text-white/20 uppercase tracking-[0.3em] text-[10px] font-bold">
        © 2026 Navior Studios. Engineered for the future.
      </footer>
    </main>
  );
};

export default CollectionPage;
