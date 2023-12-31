import prismadb from "@/lib/prismabd";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  params: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { productId, storeId } = params.params;
    const {
      name,
      categoryId,
      colorId,
      description,
      isArchived,
      sizeId,
      updatedAt,
      price,
      isFeatured,
      images,
    }: any = await req.json();

    if (!name) return new NextResponse("no name Provided", { status: 401 });

    if (name) {
      const productsOperation = prismadb.product.update({
        where: {
          id: productId,
        },

        data: {
          storeId,
          name,
          categoryId,
          colorId,
          description,
          isArchived,
          sizeId,
          updatedAt,
          price,
          isFeatured,
          images: {
            deleteMany: { productId },
            createMany: { data: [...images.map((url) => ({ url }))] },
          },
        },
      });

      return productsOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Updated product successfully ✅", product: e },
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
    console.log("###product--nested-patch########", error);
  }
}

export async function POST(
  req: NextRequest,
  params: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { storeId } = params.params;
    const {
      name,
      categoryId,
      colorId,
      description,
      isArchived,
      sizeId,
      updatedAt,
      price,
      isFeatured,
      images,
    }: any = await req.json();

    if (!name) return new NextResponse("no name Provided", { status: 401 });

    if (name) {
      const productsOperation = prismadb.product.create({
        data: {
          storeId,
          name,
          categoryId,
          colorId,
          description,
          isArchived,
          sizeId,
          updatedAt,
          price,
          isFeatured,
          images: {
            createMany: { data: [...images.map((url) => ({ url }))] },
          },
        },
      });
      return productsOperation
        .then((e) => {
          return NextResponse.json(
            { message: "Created product successfully ✅", product: e },
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
    console.log("###product--nested-patch########", error);
  }
}
export async function DELETE(
  req: NextRequest,
  params: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unauthorized", { status: 401 });
    const { productId, storeId } = params.params;
    await prismadb.image.deleteMany({where:{productId}})
    const productsOperation = prismadb.store.update({
      where: {
        id: storeId,
        userId,
      },
      data: { products: { delete: { id: productId }, } },
    });
    return productsOperation
      .then((e) => {
        console.log(e);

        return NextResponse.json(
          { message: "Deleted product successfully ✅", product: e },
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
    console.log("###product--nested-patch########", error);
  }
}
export async function GET(
  req: NextRequest,
  params: { params: {  productId: string } }
) {
  try {
    const { productId,  } = params.params;


    const productsOperation = prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        category: true,
        color: true,
        size: true,
        images: true,
      },
    });
    return productsOperation
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
    console.log("###product--nested-patch########", error);
  }
}
