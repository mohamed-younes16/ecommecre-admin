import { Label } from "@/components/ui/label";
import prismadb from "@/lib/prismabd";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { billboardId, storeId } = params.params;
    const {
      label,
      imageUrl,
      labelColor,
    }: { label: string; imageUrl: string; labelColor: string } =
      await req.json();

    if (!label) return new NextResponse("no label Provided", { status: 401 });

    if (label) {
      const billboardOperation = prismadb.store.update({
        where: {
          id: storeId,
          userId,
        },
        data: {
          billBoards: {
            update: {
              where: { id: billboardId },
              data: { imageUrl, label, labelColor },
            },
          },
        },
      });

      return billboardOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Updated BillBoard successfully ✅", store: e },
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
  params: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { storeId } = params.params;

    const {
      label,
      imageUrl,
      labelColor,
    }: { label: string; imageUrl: string; labelColor: string } =
      await req.json();

    if (!label) return new NextResponse("no label Provided", { status: 401 });

    if (label) {
      const billboardOperation = prismadb.store.update({
        where: {
          id: storeId,
          userId,
        },
        data: { billBoards: { create: { imageUrl, label, labelColor } } },
      });
      return billboardOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Created BillBoard successfully ✅", store: e },
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
  params: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { billboardId, storeId } = params.params;

    const billboardOperation = prismadb.store.update({
      where: {
        id: storeId,
        userId,
      },
      data: { billBoards: { delete: { id: billboardId } } },
    });
    return billboardOperation
      .then((e) => {
        console.log(e);

        return NextResponse.json(
          { message: "Deleted successfully ✅", store: e },
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
  params: { params: { billboardId: string } }
) {
  try {
    const { billboardId } = params.params;

    const billboardOperation = prismadb.billBoard.findMany({
      where: {
        id: billboardId,
      },
    });
    return billboardOperation
      .then((e) => {
        return NextResponse.json(e, { status: 201 });
      })
      .catch((err) => {
        console.log(err.message);
        return NextResponse.json(
          { message: "Error Happend ❌" },
          { status: 500 }
        );
      });
  } catch (error) {
    console.log("###store--nested-patch########", error);
  }
}
