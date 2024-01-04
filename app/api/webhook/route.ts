import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import prismadb from "@/lib/prismabd";

export async function POST(req: Request) {
  console.log("############################################################")
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_KEY!
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("webhook Error___________________", error);
  }
  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;
  const addressCopmonents = [
    address?.line1,
    address?.country,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.line2,
  ];
  const addressString = addressCopmonents.filter((e) => e !== null).join(", ");
  if (event.type === "checkout.session.completed") {
    console.log({
      where: { id: session?.metadata?.orderId },
      data: {
        isPaid: true,
        address: addressString,
        phoneNumber: session?.customer_details?.phone || "",
      },
      include: { items: true },
    });
    const order = await prismadb.order.update({
      where: { id: session?.metadata?.orderId },
      data: {
        isPaid: true,
        address: addressString,
        phoneNumber: session?.customer_details?.phone || "",
      },
      include: { items: true },
    });
    console.log(order)
   
  } return new NextResponse(null, { status: 200 });
}
