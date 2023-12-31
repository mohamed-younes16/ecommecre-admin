import prismadb from "@/lib/prismabd";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
  ) {
    try {
      if (!params.storeId) {
        return new NextResponse("Store id is required", { status: 400 });
      }
      
      const { searchParams } = new URL(req.url)
      const categoryId = searchParams.get('categoryId') || undefined;
      const colorId = searchParams.get('colorId') || undefined;
      const sizeId = searchParams.get('sizeId') || undefined;
      const isFeatured = searchParams.get('isFeatured');
  
  
      const products = await prismadb.product.findMany({
        where: {
          storeId: params.storeId,
          categoryId,
          colorId,
          sizeId,
          isFeatured: isFeatured ? true : undefined,
          isArchived: false,
        },
        include: {
          images: true,
          category: true,
          color: true,
          size: true,
        },
        orderBy: {
          createdAt: 'desc',
        }
      });
    
      return NextResponse.json(products);
    } catch (error) {
      console.log('[COLORS_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };