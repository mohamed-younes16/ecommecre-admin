import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import prismadb from "@/lib/prismabd";
import { format } from "date-fns";

import { PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ColorColumn, columns } from "./components/columns";
import ApiList from "@/components/ApiList";
import { Separator } from "@/components/ui/separator";

const page = async ({
  params: { storeId },
}: {
  params: { storeId: string };
}) => {
  const colors = (await prismadb.color.findMany({ where: { storeId } })) || [];
  const formattedcolors: ColorColumn[] = colors.map((e) => ({
    id: e.id,
    createdAt: format(e.createdAt, "MMMM do , yyyy"),
    name: e.name,
    value: e.value,
  }));

  return (
    <div id="content" className="p-6">
      <div className="flex items-center justify-between">
        <Heading
          title={`colors (${colors.length})`}
          description="Manage colors For Your Store"
        />{" "}
        <Link href={`/dashboard/${storeId}/colors/new`} className="flexcenter">
          <Button className="flexcenter gap-6">
            <PlusCircle /> Add New{" "}
          </Button>
        </Link>
      </div>{" "}
      <Separator className="my-6" />
      <DataTable searchKey="name" columns={columns} data={formattedcolors} />
      <ApiList entityName="colors" entitiIdName="colorId" />
    </div>
  );
};

export default page;
