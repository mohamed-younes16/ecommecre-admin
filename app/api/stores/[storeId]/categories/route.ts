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
  
      const categories = await prismadb.category.findMany({
        where: {
          storeId: params.storeId
        }
      });
    
      return NextResponse.json(categories);
    } catch (error) {
      console.log('[BILLBOARDS_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };