
import CategoryForm from "@/components/forms/CategoryForm";
import prismadb from "@/lib/prismabd";
import React from "react";

const page = async ({
  params: { storeId, categoryId },
}: {
  params: { storeId: string; categoryId: string };
}) => {
  const category = await prismadb.category.findUnique({
    where: { id: categoryId },
    include:{billboard:true}
  });
  const billBoards = await prismadb.billBoard.findMany({
    where: { storeId },
  });

  return (
    <div>
      <CategoryForm category={category!} billBoards={billBoards} storeId={storeId} />
    </div>
  );
}

export default page;
