import BillboardForm from "@/components/forms/BillboardForm";
import prismadb from "@/lib/prismabd";
import React from "react";

const page = async ({
  params: { storeId, billboardId },
}: {
  params: { storeId: string; billboardId: string };
}) => {
  const billboard = await prismadb.billBoard.findUnique({
    where: { id: billboardId },
  });

  return (
    <div>
      <BillboardForm billboard={billboard!} storeId={storeId} />
    </div>
  );
};

export default page;
