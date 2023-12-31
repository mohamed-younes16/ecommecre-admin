import prismadb from "@/lib/prismabd";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { categoryId, storeId } = params.params;
    const { name, billboardId }: { name: string; billboardId: string } =
      await req.json();

    if (!name) return new NextResponse("no name Provided", { status: 401 });

    if (name) {
      const categoriesOperation = prismadb.store.update({
        where: {
          id: storeId,
          userId,
        },
        data: {
          categories: {
            update: { where: { id: categoryId }, data: { name, billboardId } },
          },
        },
      });

      return categoriesOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Updated Category successfully ✅", store: e },
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
  params: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { storeId } = params.params;

    const { name, billboardId }: { name: string; billboardId: string } =
      await req.json();

    if (!name) return new NextResponse("no name Provided", { status: 401 });

    if (name) {
      const categoriesOperation = prismadb.store.update({
        where: {
          id: storeId,
          userId,
        },
        data: { categories: { create: { billboardId, name } } },
      });
      return categoriesOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Created Category successfully ✅", store: e },
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
  params: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { categoryId, storeId } = params.params;

    const categoriesOperation = prismadb.store.update({
      where: {
        id: storeId,
        userId,
      },
      data: { categories: { delete: { id: categoryId } } },
    });
    return categoriesOperation
      .then((e) => {
        console.log(e);

        return NextResponse.json(
          { message: "Deleted Category successfully ✅", store: e },
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
  params: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = params.params;

    const categoriesOperation = prismadb.category.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
        products: {
          include: {
            category: true,
            color: true,
            size: true,
            images: true,
          },
        },
      },
    });
    return categoriesOperation
      .then((e) => {
        console.log(e);

        return NextResponse.json(e);
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
