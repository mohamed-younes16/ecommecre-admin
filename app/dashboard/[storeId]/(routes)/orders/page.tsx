import Heading from "@/components/Heading";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/prismabd";
import { format } from "date-fns";
import React from "react";
import { orderColumn, columns } from "./components/columns";
import { Separator } from "@/components/ui/separator";
import CleanUp from "./components/CleanUp";

const page = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const cleanUp = async () => {
    "use server";
    await prismadb.order.deleteMany({
      where: { storeId, address: "" },
    });
  };
  const orders = await prismadb.order.findMany({
    where: { storeId },
    orderBy: { createdAt: "desc" },
    include: { items: { include: { product: true } } },
  });
  const inactiveOrders = orders.find((e) => e.address === "");

  const orderPrice = (order) => {
    let tot = 0;
    order.items.forEach((e) => {
      console.log(e.count);
      tot += Number(e.product.price) * e.count;
    });

    return tot;
  };

  const formattedorders: orderColumn[] = orders.map((e) => ({
    products: e.items.map((e) => e.product.name).join(" "),

    id: e.id,
    createdAt: format(e.createdAt, "MMMM do , yyyy"),
    phone: e.phoneNumber,
    address: e.address,
    isPaid: e.isPaid,
    totalPrice: +orderPrice(e),
  }));

  return (
    <div id="content" className="p-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`orders (${orders.length})`}
          description="Manage orders For Your Store"
        />{" "}
        {inactiveOrders && <CleanUp cleanUp={cleanUp} />}
      </div>{" "}
      <Separator className="my-6" />
      <DataTable searchKey="name" columns={columns} data={formattedorders} />
    </div>
  );
};

export default page;
