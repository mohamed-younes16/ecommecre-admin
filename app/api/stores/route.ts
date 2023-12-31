import prismadb from "@/lib/prismabd";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });

    const { name } = await req.json();
    if (!name) return new NextResponse("no Name Provided", { status: 401 });
    if (name) {
      const store = prismadb.store.create({ data: { name, userId } });
      return store
        .then((e) => {
          return NextResponse.json(
            { message: "created successfully ✅", store: e },
            { status: 201 }
          );
        })
        .catch((err) => {
          console.log(err.message);
          return NextResponse.json(
            { message: "Error Happend ❌" },
            { status: 500 }
          );
        });
    }
  } catch (error) {
    console.log("###store-route########", error);
  }
}
