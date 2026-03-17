import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Save the subscription to Firestore
    await setDoc(doc(db, "newsletter", email), {
      email,
      subscribedAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Newsletter Error:", error);
    return NextResponse.json({ error: "Error subscribing to newsletter" }, { status: 500 });
  }
}
