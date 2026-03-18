import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { adminDb } from "@/lib/firebase-admin";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    if (!adminDb) {
      return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
    }

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
      const ordersRef = adminDb.collection("orders");
      const querySnapshot = await ordersRef.where("razorpayOrderId", "==", razorpay_order_id).get();

      if (!querySnapshot.empty) {
        const orderDoc = querySnapshot.docs[0];
        const orderData = orderDoc.data();

        // 1. Update order status
        await adminDb.doc(`orders/${orderDoc.id}`).update({
          paymentStatus: "paid",
          razorpayPaymentId: razorpay_payment_id,
          updatedAt: new Date().toISOString(),
        });

        // 2. AUTOMATION: Automated Inventory Management
        // Subtract stock for each item in the order
        const items = orderData.items || [];
        for (const item of items) {
          const productRef = adminDb.doc(`products/${item.id}`);
          const productSnap = await productRef.get();
          
          if (productSnap.exists) {
            const currentStock = productSnap.data()?.stock || 0;
            await productRef.update({
              stock: currentStock - item.quantity
            });
          }
        }

        // 3. AUTOMATION: Send Order Success Email
        try {
          const userDoc = await adminDb.doc(`users/${orderData.userId}`).get();
          if (userDoc.exists) {
            const userData = userDoc.data();
            const userEmail = userData?.email;

            await resend.emails.send({
              from: 'orders@naviorstudios.com', // Replace with your verified domain
              to: userEmail,
              subject: 'Order Confirmation - Navior Studios',
              html: `
                <h1>Thank you for your order!</h1>
                <p>Your order #${orderDoc.id} has been successfully processed.</p>
                <p>Payment ID: ${razorpay_payment_id}</p>
                <p>We'll send you shipping updates soon.</p>
                <br>
                <p>Best regards,<br>Navior Studios Team</p>
              `,
            });
          }
        } catch (emailError) {
          console.error("Email sending error:", emailError);
          // Don't fail the payment verification if email fails
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
