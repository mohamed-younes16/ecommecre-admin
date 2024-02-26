import prismadb from "@/lib/prismabd";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export interface productType {
  productId: string;
  quantity: number;
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  const { productsData,ownerId }: { productsData: productType[] ,ownerId:string} = await req.json();
  console.log(productsData)
  const productIds = productsData.map((e) => e.productId);
  const products = await prismadb.product.findMany({
    where: { id: { in: productIds } },
  });
  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  products.forEach((el) =>
    line_items.push({
      quantity: productsData.find((e) => e.productId === el.id)?.quantity,
      adjustable_quantity: { enabled: false },
      price_data: {
        currency: "USD",
        product_data: { name: el.name },
        unit_amount: +el.price * 100,
      },
    })
  );

  const order = await prismadb.order.create({
    data: {
      orderOwnerId:ownerId,
      isPaid: false,
      storeId: params.storeId,
      items: {
        create: productIds.map((e: string) => ({
          product: {
            connect: {
              id: e,
            },
          },
          count: productsData.find((el) => el.productId === e)?.quantity,
        })),
      },
    },
  });

  const sesssion = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    submit_type: "pay",
    billing_address_collection: "required",
    phone_number_collection: { enabled: true },
    success_url: `${process.env.FRONT_END_URL}?success=true`,
    cancel_url: `${process.env.FRONT_END_URL}?canceled=true`,
    metadata: { orderId: order.id },
  });
  return NextResponse.json({ url: sesssion.url }, { headers: corsHeaders });
}
