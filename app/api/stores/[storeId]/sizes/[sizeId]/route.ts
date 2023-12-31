import prismadb from "@/lib/prismabd";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { sizeId, storeId } = params.params;
    const { name, value }: any = await req.json();

    if (!name) return new NextResponse("no name Provided", { status: 401 });

    if (name) {
      const sizesOperation = prismadb.store.update({
        where: {
          id: storeId,
          userId,
        },
        data: {
          sizes: {
            update: { where: { id: sizeId }, data: { name, value } },
          },
        },
      });

      return sizesOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Updated size successfully ✅", store: e },
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

export async function POST(
  req: NextRequest,
  params: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { storeId,sizeId } = params.params;
    const { name, value }: any = await req.json();
    console.log({ name, value, storeId ,sizeId });
    if (!name) return new NextResponse("no name Provided", { status: 401 });

    if (name) {
      const sizesOperation = prismadb.store.update({
        where: {
          id: storeId,
          userId,
        },
        data: { sizes: { create: { value, name } } },
      });
      return sizesOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Created size successfully ✅", store: e },
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
  params: { params: { storeId: string; sizeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { sizeId, storeId } = params.params;

    const sizesOperation = prismadb.store.update({
      where: {
        id: storeId,
        userId,
      },
      data: { sizes: { delete: { id: sizeId } } },
    });
    return sizesOperation
      .then((e) => {
        console.log(e);

        return NextResponse.json(
          { message: "Deleted size successfully ✅", store: e },
          { status: 201 }
        );
      })
      .catch((err) => {
        console.log(err.message);
        return NextResponse.json(
          { message: "Error Happend ❌" },
          { status: 401 }
        );
      });
  } catch (error) {
    console.log("###store--nested-patch########", error);
  }
}
export async function GET(
  req: NextRequest,
  params: { params: { storeId: string } }
) {
  try {
    const { storeId } = params.params;

    const sizesOperation = prismadb.size.findMany({
      where: {
        storeId,
      },
    });
    return sizesOperation
      .then((e) => {
        console.log(e);

        return NextResponse.json(
          { message: "Found successfully ✅", store: e },
          { status: 201 }
        );
      })
      .catch((err) => {
        console.log(err.message);
        return NextResponse.json(
          { message: "Error Happend ❌" },
          { status: 401 }
        );
      });
  } catch (error) {
    console.log("###store--nested-patch########", error);
  }
}
