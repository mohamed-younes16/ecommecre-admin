import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/prismabd";
import { format } from "date-fns";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

import ApiList from "@/components/ApiList";
import { Separator } from "@/components/ui/separator";
import { categoryColumn, columns } from "./components/columns";

const page = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const categories = await prismadb.category.findMany({
    where: { storeId },
    include: { billboard: true },
    orderBy: { createdAt: "desc" },
  });

  const formattedBillBoards: categoryColumn[] = categories.map((e) => ({
    id: e.id,
    createdAt: format(e.createdAt, "MMMM do , yyyy"),
    name: e.name,
    billboardLabel: e.billboard.label
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${categories.length})`}
          description="Manage Categories For Your Store"
        />{" "}
        <Link
          href={`/dashboard/${storeId}/categories/new`}
          className="flexcenter"
        >
          <Button className="flexcenter gap-6">
            <PlusCircle /> Add New{" "}
          </Button>
        </Link>
      </div>{" "}
      <Separator className="my-6" />
      <DataTable searchKey='name' columns={columns} data={formattedBillBoards} />
      <ApiList entityName="categories" entitiIdName="categoryId" />
    </div>
  );
};

export default page;
