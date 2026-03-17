import algoliasearch from "algoliasearch";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

/**
 * AUTOMATION: Algolia Sync Utility
 * 
 * This utility synchronizes Firestore products with the Algolia Search Index.
 * It can be called from an admin dashboard or a background cron job.
 */
export const syncProductsToAlgolia = async () => {
  try {
    const APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
    const ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY!;
    const INDEX_NAME = "products_index";

    const client = algoliasearch(APP_ID, ADMIN_KEY);
    const index = client.initIndex(INDEX_NAME);

    // 1. Fetch all products from Firestore
    const productsSnapshot = await getDocs(collection(db, "products"));
    const products = productsSnapshot.docs.map((doc) => ({
      objectID: doc.id,
      ...doc.data(),
    }));

    if (products.length === 0) {
      console.log("No products found in Firestore to sync.");
      return { success: true, count: 0 };
    }

    // 2. Push to Algolia
    const { objectIDs } = await index.saveObjects(products);

    console.log(`Successfully synced ${objectIDs.length} products to Algolia.`);
    return { success: true, count: objectIDs.length };
  } catch (error) {
    console.error("Error syncing to Algolia:", error);
    return { success: false, error };
  }
};
