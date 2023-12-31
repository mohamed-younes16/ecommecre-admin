import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/prismabd";
import { format } from "date-fns";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SizeColumn, columns } from "./components/columns";
import ApiList from "@/components/ApiList";
import { Separator } from "@/components/ui/separator";

const page = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const sizes = (await prismadb.size.findMany({ where: { storeId } })) || [];
  const formattedsizes: SizeColumn[] = sizes.map((e) => ({
    id: e.id,
    createdAt: format(e.createdAt, "MMMM do , yyyy"),
    name: e.name,
    value: e.value,
  }));

  return (
    <div id="content" className="p-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`sizes (${sizes.length})`}
          description="Manage sizes For Your Store"
        />{" "}
        <Link href={`/dashboard/${storeId}/sizes/new`} className="flexcenter">
          <Button className="flexcenter gap-6">
            <PlusCircle /> Add New{" "}
          </Button>
        </Link>
      </div>{" "}
      <Separator className="my-6" />
      <DataTable searchKey="name" columns={columns} data={formattedsizes} />
      <ApiList entityName="sizes" entitiIdName="sizeId" />
    </div>
  );
};

export default page;
