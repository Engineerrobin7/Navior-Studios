import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/firebase";
import { doc, updateDoc, collection, query, where, getDocs, increment, getDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("razorpayOrderId", "==", razorpay_order_id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const orderDoc = querySnapshot.docs[0];
        const orderData = orderDoc.data();

        // 1. Update order status
        await updateDoc(doc(db, "orders", orderDoc.id), {
          paymentStatus: "paid",
          razorpayPaymentId: razorpay_payment_id,
          updatedAt: new Date().toISOString(),
        });

        // 2. AUTOMATION: Automated Inventory Management
        // Subtract stock for each item in the order
        const items = orderData.items || [];
        for (const item of items) {
          const productRef = doc(db, "products", item.id);
          const productSnap = await getDoc(productRef);
          
          if (productSnap.exists()) {
            await updateDoc(productRef, {
              stock: increment(-item.quantity)
            });
          }
        }

        return NextResponse.json({ message: "Payment verified successfully" });
      } else {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Error verifying payment" }, { status: 500 });
  }
}
