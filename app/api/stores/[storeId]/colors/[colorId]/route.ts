import prismadb from "@/lib/prismabd";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { colorId, storeId } = params.params;
    const { name, value }: any = await req.json();

    if (!name) return new NextResponse("no name Provided", { status: 401 });

    if (name) {
      const colorsOperation = prismadb.store.update({
        where: {
          id: storeId,
          userId,
        },
        data: {
          colors: {
            update: { where: { id: colorId }, data: { name, value } },
          },
        },
      });

      return colorsOperation
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
  params: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { storeId,colorId } = params.params;
    const { name, value }: any = await req.json();
    console.log({ name, value, storeId ,colorId });
    if (!name) return new NextResponse("no name Provided", { status: 401 });

    if (name) {
      const colorsOperation = prismadb.store.update({
        where: {
          id: storeId,
          userId,
        },
        data: { colors: { create: { value, name } } },
      });
      return colorsOperation
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
  params: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { colorId, storeId } = params.params;

    const colorsOperation = prismadb.store.update({
      where: {
        id: storeId,
        userId,
      },
      data: { colors: { delete: { id: colorId } } },
    });
    return colorsOperation
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

    const colorsOperation = prismadb.size.findMany({
      where: {
        storeId,
      },
    });
    return colorsOperation
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
