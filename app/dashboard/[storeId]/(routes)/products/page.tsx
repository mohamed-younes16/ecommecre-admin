import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/prismabd";
import { format } from "date-fns";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ProductColumn, columns } from "./components/columns";
import ApiList from "@/components/ApiList";
import { Separator } from "@/components/ui/separator";

const page = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const Products = await prismadb.product.findMany({
    where: { storeId },
    include: { color: true, category: true, size: true ,images:true},
  });
  const formattedProducts:ProductColumn[] = Products.map((e) => ({
    id: e.id,
    createdAt: format(e.createdAt, "MMMM do , yyyy"),
    name: e.name,
    color: e.color.value,
    category: e.category.name,
    isArchived: e.isArchived,
    size:e.size.value,
    isFeatured: e.isFeatured,
    price:e.price.toString(),
    image: e.images[0].url
  }));

  return (
    <div id="content" className="p-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${Products.length})`}
          description="Manage Products For Your Store"
        />{" "}
        <Link
          href={`/dashboard/${storeId}/products/new`}
          className="flexcenter"
        >
          <Button className="flexcenter gap-6">
            <PlusCircle /> Add New{" "}
          </Button>
        </Link>
      </div>{" "}
      <Separator className="my-6" />
      <DataTable searchKey="name" columns={columns} data={formattedProducts} />
      <ApiList entityName="products" entitiIdName="productId" />
    </div>
  );
};

export default page;
