
import ColorForm from "@/components/forms/colorForm";
import prismadb from "@/lib/prismabd";
import React from "react";

const page = async ({
  params: { storeId, colorId },
}: {
  params: { storeId: string; colorId: string };
}) => {
  const color = await prismadb.color.findUnique({
    where: { id: colorId },
  });

  return (
    <div>
      <ColorForm color={color!} storeId={storeId} />
    </div>
  );
};

export default page;
