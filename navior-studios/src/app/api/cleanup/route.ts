import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";

export async function POST() {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
    }

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // 1. Clean up stale orders (pending payment for more than 24 hours)
    const staleOrdersQuery = adminDb.collection("orders")
      .where("paymentStatus", "==", "pending")
      .where("createdAt", "<", twentyFourHoursAgo.toISOString());
    const staleOrdersSnapshot = await staleOrdersQuery.get();

    let deletedOrders = 0;
    for (const orderDoc of staleOrdersSnapshot.docs) {
      // Restore inventory for stale orders
      const orderData = orderDoc.data();
      const items = orderData.items || [];
      for (const item of items) {
        const productRef = adminDb.doc(`products/${item.id}`);
        const productSnap = await productRef.get();
        
        if (productSnap.exists) {
          const currentStock = productSnap.data()?.stock || 0;
          await productRef.update({
            stock: currentStock + item.quantity // Restore stock by adding back
          });
        }
      }
      await adminDb.doc(`orders/${orderDoc.id}`).delete();
      deletedOrders++;
    }

    // 2. Clean up abandoned carts (if stored in DB - currently carts are local storage)
    // Note: Carts are currently stored in browser localStorage via Zustand
    // For server-side abandoned cart cleanup, carts would need to be stored in Firestore
    // with userId, items, lastUpdated timestamp
    // Example implementation if carts were in DB:
    /*
    const abandonedCartsQuery = query(
      collection(db, "carts"),
      where("lastUpdated", "<", sevenDaysAgo.toISOString())
    );
    const abandonedCartsSnapshot = await getDocs(abandonedCartsQuery);
    let deletedCarts = 0;
    for (const cartDoc of abandonedCartsSnapshot.docs) {
      await deleteDoc(doc(db, "carts", cartDoc.id));
      deletedCarts++;
    }
    */

    return NextResponse.json({
      message: "Cleanup completed",
      deletedOrders,
      // deletedCarts: deletedCarts || 0,
    });
  } catch (error) {
    console.error("Cleanup error:", error);
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
  }
}