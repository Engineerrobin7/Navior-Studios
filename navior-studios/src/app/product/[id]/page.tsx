import { Metadata } from "next";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import ProductContent from "./ProductContent";
import { Product } from "@/store/useCartStore";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    
    // Fallback for demo
    const dummyProducts: Record<string, Product> = {
      "1": {
        id: "1",
        name: "Titan Shield Pro",
        price: 2499,
        images: [],
        category: "Cases",
        compatibility: ["iPhone 16 Pro"],
        description: "Aerospace-grade protection for your gear."
      }
    };
    return dummyProducts[id] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | NAVIOR STUDIOS",
    };
  }

  return {
    title: `${product.name} | NAVIOR STUDIOS`,
    description: product.description,
    openGraph: {
      title: `${product.name} | NAVIOR STUDIOS`,
      description: product.description,
      images: product.images.length > 0 ? [{ url: product.images[0] }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | NAVIOR STUDIOS`,
      description: product.description,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductContent initialProduct={product} />;
}
