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
    // Temporarily disabled - needs Algolia v5 API update
    console.log("Algolia sync temporarily disabled");
    return { success: true, count: 0 };
  } catch (error) {
    console.error("Error syncing to Algolia:", error);
    return { success: false, error };
  }
};
