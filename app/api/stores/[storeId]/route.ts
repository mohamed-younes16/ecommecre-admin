import prismadb from "@/lib/prismabd";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    console.log(params);
    const { name } = await req.json();

    if (!name) return new NextResponse("no Name Provided", { status: 401 });

    if (name) {
      const store = prismadb.store.update({
        where: { id: params.params.storeId, userId },
        data: { name },
      });
      return store
        .then((e) => {
          return NextResponse.json(
            { message: "Updated successfully ✅", store: e },
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
    console.log("###store--nested-patch########", error);
  }
}

export async function DELETE(
  req: NextRequest,
  params: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });

    if (userId) {
      const store = prismadb.store.deleteMany({
        where: { id: params.params.storeId, userId },
      });
      return store
        .then((e) => {
          return NextResponse.json(
            { message: "Deleted successfully ✅", store: e },
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
    console.log("###store--nested-delete########", error);
  }
}
