
import SizeForm from "@/components/forms/SizeForm";
import prismadb from "@/lib/prismabd";
import React from "react";

const page = async ({
  params: { storeId, sizeId },
}: {
  params: { storeId: string; sizeId: string };
}) => {
  const size = await prismadb.size.findUnique({
    where: { id: sizeId },
  });

  return (
    <div>
      <SizeForm size={size!} storeId={storeId} />
    </div>
  );
};

export default page;
