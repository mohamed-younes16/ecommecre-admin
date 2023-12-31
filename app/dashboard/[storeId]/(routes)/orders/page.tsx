import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/prismabd";
import { format } from "date-fns";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { orderColumn, columns } from "./components/columns";
import ApiList from "@/components/ApiList";
import { Separator } from "@/components/ui/separator";

const page = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const orders = await prismadb.order.findMany({
    where: { storeId },
    include: { items: { include: { Product: true } } },
  });
  const formattedorders: orderColumn[] = orders.map((e) => ({
    id: e.id,
    createdAt: format(e.createdAt, "MMMM do , yyyy"),
    phone: e.phoneNumber,
    address: e.address,
    isPaid: e.isPaid,
    totalPrice: e.items.reduce((c, n) => c + (+(n.Product.price)), 0),

  }));

  return (
    <div id="content" className="p-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`orders (${orders.length})`}
          description="Manage orders For Your Store"
        />{" "}
   
      </div>{" "}
      <Separator className="my-6" />
      <DataTable searchKey="name" columns={columns} data={formattedorders} />

    </div>
  );
};

export default page;
